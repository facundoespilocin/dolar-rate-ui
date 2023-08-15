using AutoMapper;
using Ecommerce.DataAccessLayer.Models;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using Ecommerce.Services.Interfaces;
using Ecommerce.Utils.EmailService;
using Ecommerce.Utils.Settings;
using Ecommerce.Utils.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using User = Ecommerce.DataAccessLayer.Entities.User.User;
using CreateUserRequest = Ecommerce.DataAccessLayer.Models.CreateUserRequest;
using Org.BouncyCastle.Asn1.Ocsp;

namespace Ecommerce.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public UserService(IUserRepository userRepository, IOptions<AppSettings> appSettings, IMapper mapper, IEmailService emailService)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var usersList = await _userRepository.GetAll();

            return usersList;
        }

        public async Task<User> GetById(long userId)
        {
            var user = await _userRepository.GetById(userId);

            return user;
        }

        public async Task UpdateUser(User userRequest)
        {
            User user;

            user = await _userRepository.GetById(userRequest.Id);

            await _userRepository.Update(user);
        }

        public async Task<ServiceResponse> Create(CreateUserRequest request)
        {
            ServiceResponse response = new()
            {
                Metadata = new Metadata { },
                Data = new Data { }
            };

            try
            {
                response = await _userRepository.Create(request);

                var directoryName = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

                var htmlText = File.ReadAllText(Path.Combine(directoryName, "EmailFiles/Invitation.html"));

                string fullName = request.Name + ' ' + request.LastName;

                var textCopy = htmlText;

                textCopy = textCopy.Replace("#FULLNAME", fullName)
                    .Replace("#INVITELINK", _appSettings.BaseUrl.AppendToURL($"Register/Confirm?token={request.ConfirmationToken}"))
                    .Replace("#COMPANYNAME", "Ecommerce");

                var subject = "You have been invited to Ecommerce";

                _emailService.Send(request.Email, subject, textCopy, request.Email);
            }
            catch (Exception e)
            {
                response.Metadata.Status = System.Net.HttpStatusCode.BadRequest;
                response.Metadata.Message = e.Message;
            }

            return response;
        }

        public async Task<AuthResponse> Authenticate(AuthRequest request)
        {
            var authResponse = await GetByCredentials(request.UserName, request.Password);

            authResponse.Token = GenerateJwtToken(authResponse);

            authResponse.UserData = await GetUserDataDtoById(authResponse.Id);

            return authResponse;
        }

        public async Task<AuthResponse> GetByCredentials(string userName, string password)
        {
            var user = await _userRepository.GetByCredentials(userName, password) ?? throw new Exception($"Username {userName} does not exist or Password is incorrect");

            if (!user.ConfirmedAccount)
                throw new Exception($"Account isn't confirmed");

            return _mapper.Map<AuthResponse>(user);
        }

        private string GenerateJwtToken(AuthResponse user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<ResetPasswordResponse> UpdateUserPassword(ResetPasswordRequest request)
        {
            var validation = await ValidateResetPasswordToken(request.Token);

            if (validation)
            {
                await _userRepository.UpdateUserPassword(request.Token, request.NewPassword);

                return new ResetPasswordResponse { Succeded = true };
            }

            return new ResetPasswordResponse { Succeded = false };
        }

        public async Task<bool> ValidateResetPasswordToken(string token)
        {
            var user = await _userRepository.GetUserByToken(token);

            if (user is not null)
            {
                if (!string.IsNullOrEmpty(user.PasswordResetToken))
                {
                    return true;
                }
            }

            return false;
        }

        public async Task PostForgotPassword(string email)
        {
            var user = await _userRepository.GetUserByEmailWithPass(email) ?? throw new Exception($"Email {email} does not exist");

            user.PasswordResetToken = Guid.NewGuid().ToString();

            await _userRepository.UpdateResetPasswordToken(email, user.PasswordResetToken);

            var directoryName = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            var htmlText = File.ReadAllText(Path.Combine(directoryName, "EmailFiles/ForgotPassword.html"));
            
            var textCopy = htmlText;

            textCopy = textCopy.Replace("#INVITELINK", _appSettings.BaseUrl.AppendToURL($"ForgotPassword/Confirm?token={user.PasswordResetToken}"))
                .Replace("#COMPANYNAME", "Ecommerce")
                .Replace("#INVITELINK", user.PasswordResetToken);

            var subject = "You received a password reset request from Ecommerce";

            _emailService.Send(email, subject, textCopy, email);
        }

        public async Task<UserDataDTO> GetUserDataDtoById(long userId)
        {
            var user = await _userRepository.GetById(userId);

            return _mapper.Map<UserDataDTO>(user);
        }

        public async Task<ServiceResponse> ConfirmAccount(string token)
        {
            ServiceResponse response = new()
            {
                Metadata = new Metadata
                {
                    Message = "Success",
                    Status = System.Net.HttpStatusCode.OK
                },
                Data = new Data { }
            };

            try
            {
                await _userRepository.ConfirmAccount(token);
            }
            catch (Exception e)
            {
                response.Metadata.Status = System.Net.HttpStatusCode.BadRequest;
                response.Metadata.Message = e.Message;
            }

            return response;
        }
    }
}
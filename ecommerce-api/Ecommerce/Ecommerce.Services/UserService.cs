using AutoMapper;
using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Models;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using Ecommerce.Services.Interfaces;
using Ecommerce.Utils.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecommerce.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        //private readonly AWSSettings _awsSettings;

        public UserService(IUserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
            //_awsSettings = awsSettings.Value;
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

        public async Task Create(User userRequest)
        {
            await _userRepository.Create(userRequest);
        }

        public async Task<AuthResponse> Authenticate(AuthRequest request)
        {
            var user = await GetByCredentials(request.UserName, request.Password);

            user.Token = GenerateJwtToken(user);

            user.UserData = await GetById(user.Id);

            return user;
        }

        public async Task<AuthResponse> GetByCredentials(string userName, string password)
        {
            var user = await _userRepository.GetByCredentials(userName, password);

            if (user == null)
                throw new Exception($"Username {userName} does not exist or Password is incorrect");

            if (!user.ConfirmedAccount)
                throw new Exception($"Account isn't confirmed");

            return new AuthResponse();
            //return _mapper.Map<AuthResponse>(user);
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

            if (!string.IsNullOrEmpty(user.PasswordResetToken))
            {
                return true;
            }

            return false;
        }

        public async Task PostForgotPassword(string email)
        {
            var user = await _userRepository.GetUserByEmailWithPass(email);

            if (user is null)
            {
                throw new Exception($"Email {email} does not exist");
            }

            user.PasswordResetToken = Guid.NewGuid().ToString();

            await _userRepository.UpdateResetPasswordToken(email, user.PasswordResetToken);

            //string directoryName = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            //var textCopy = File.ReadAllText(Path.Combine(directoryName, "EmailFiles/Resetpassword.html"));

            //textCopy = textCopy.Replace("#USERNAME", user.FullName).Replace("#RECOVERPASSWORDLINK", _awsSettings.BaseUrl.AppendToURL($"/account/reset-password/{user.PasswordResetToken}"));

            //await AWSEmailService.SendMail(_awsSettings.EmailSender, user.Email, "Password reset request", textCopy, _awsSettings.AccessKey, _awsSettings.AccessSecret, RegionEndpoint.USEast2);
        }
    }
}
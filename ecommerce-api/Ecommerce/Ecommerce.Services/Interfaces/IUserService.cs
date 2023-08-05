using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Models;

namespace Ecommerce.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(long userId);
        Task<ServiceResponse> Create(CreateUserRequest user);
        Task UpdateUser(User userRequest);
        Task<ResetPasswordResponse> UpdateUserPassword(ResetPasswordRequest request);
        Task<AuthResponse> Authenticate(AuthRequest request);
        Task<bool> ValidateResetPasswordToken(string token);
        Task PostForgotPassword(string email);
        Task<UserDataDTO> GetUserDataDtoById(long userId);
        Task<ServiceResponse> ConfirmAccount(string token);
    }
}
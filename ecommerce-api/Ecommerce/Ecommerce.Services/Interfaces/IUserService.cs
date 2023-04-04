using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Models;

namespace Ecommerce.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(long userId);
        Task Create(User user);
        Task UpdateUser(User userRequest);
        Task<ResetPasswordResponse> UpdateUserPassword(ResetPasswordRequest request);
        Task<AuthResponse> Authenticate(AuthRequest request);
        Task<bool> ValidateResetPasswordToken(string token);
        Task PostForgotPassword(string email);
    }
}
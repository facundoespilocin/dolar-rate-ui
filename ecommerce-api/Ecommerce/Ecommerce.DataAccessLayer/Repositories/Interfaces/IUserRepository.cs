using Ecommerce.DataAccessLayer.Entities.User;

namespace Ecommerce.DataAccessLayer.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(long userId);
        Task Create(User userRequest);
        Task Update(User user);
        Task Delete(int userId);
        Task<User> GetByCredentials(string email, string password);
        Task<User> GetUserByToken(string token);
        Task UpdateUserPassword(string token, string password);
        Task<User> GetUserByEmailWithPass(string email);
        Task UpdateResetPasswordToken(string email, string token);
    }
}
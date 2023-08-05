using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Models;

namespace Ecommerce.DataAccessLayer.Repositories.Interfaces
{
    public interface IProductsRepository
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(long userId);
        Task<ServiceResponse> Create(CreateUserRequest request);
        Task Update(User user);
        Task Delete(int userId);
    }
}
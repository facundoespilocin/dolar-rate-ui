using Ecommerce.DataAccessLayer.Entities.Product;
using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using static Ecommerce.Utils.Enums;

namespace Ecommerce.Services.Interfaces
{
    public interface IProductsService
    {
        Task<IEnumerable<Product>> LoadProducts(IFormFile file, DataSourceTypes dataSource);
        Task<IEnumerable<Product>> ReadProducts(IFormFile file, DataSourceTypes dataSource);
        //Task<IEnumerable<User>> GetAll();
        //Task<User> GetById(long userId);
        //Task<ServiceResponse> Create(CreateUserRequest user);
        //Task UpdateUser(User userRequest);
        //Task<ResetPasswordResponse> UpdateUserPassword(ResetPasswordRequest request);
    }
}
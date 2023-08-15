using Ecommerce.DataAccessLayer.Entities.Product;
using Ecommerce.DataAccessLayer.Models;

namespace Ecommerce.DataAccessLayer.Repositories.Interfaces
{
    public interface ICategoriesRepository
    {
        Task<IEnumerable<Category>> GetAll(SearchRequest request);
        Task<Category> GetById(long categoryId);
        Task<ServiceResponse> InsertProducts(IEnumerable<Category> categories);
    }
}
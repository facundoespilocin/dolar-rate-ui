using Ecommerce.DataAccessLayer.Entities.Product;
using Ecommerce.DataAccessLayer.Models;
using static Ecommerce.Utils.Enums;

namespace Ecommerce.Services.Interfaces
{
    public interface ICategoriesService
    {
        Task<IEnumerable<Category>> GetAll(SearchRequest request);
        Task<ServiceResponse> PostCreateCategory(CreateCategoryDTO request);
    }
}
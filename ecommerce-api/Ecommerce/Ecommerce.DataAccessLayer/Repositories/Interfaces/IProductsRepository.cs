using Ecommerce.DataAccessLayer.Entities.Product;
using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Models;

namespace Ecommerce.DataAccessLayer.Repositories.Interfaces
{
    public interface IProductsRepository
    {
        Task<IEnumerable<ProductDTO>> GetAll(SearchRequest request);
        Task<IEnumerable<ProductDTO>> GetAllFiltered(SearchRequest request);
        Task<Product> GetById(long productId);
        Task<ServiceResponse> InsertProducts(IEnumerable<Product> products);
        Task<ServiceResponse> InsertProduct(CreateProductDTO product);
    }
}
using Ecommerce.DataAccessLayer.Entities.Order;
using Ecommerce.DataAccessLayer.Models;

namespace Ecommerce.DataAccessLayer.Repositories.Interfaces
{
    public interface IOrdersRepository
    {
        Task<CreateOrderDTO> GetById(long orderId);
        Task<ServiceResponse> PostCreateOrder(CreateOrderDTO request, long userId);
        Task<ServiceResponse> PutAddItemsToOrder(UpdateOrderDTO request, long userId);
        Task<ServiceResponse> PutFinishOrder(long orderId, long userId);
    }
}
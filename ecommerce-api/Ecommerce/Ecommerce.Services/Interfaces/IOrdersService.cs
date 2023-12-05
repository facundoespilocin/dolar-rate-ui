using Ecommerce.DataAccessLayer.Entities.Order;
using Ecommerce.DataAccessLayer.Models;

namespace Ecommerce.Services.Interfaces
{
    public interface IOrdersService
    {
        Task<CreateOrderDTO> GetById(long orderId);
        Task<ServiceResponse> PostCreateOrder(CreateOrderDTO request, long userId);
        Task<ServiceResponse> PutAddItemsToOrder(UpdateOrderDTO request, long userId);
    }
}
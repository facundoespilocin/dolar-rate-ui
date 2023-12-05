using Dapper;
using Ecommerce.DataAccessLayer.Entities.Order;
using Ecommerce.DataAccessLayer.Factory;
using Ecommerce.DataAccessLayer.Models;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using static Ecommerce.Utils.Enums;

namespace Ecommerce.DataAccessLayer.Repositories
{
    public class OrdersRepository : IOrdersRepository
    {
        private IConnectionFactory _factory;

        public OrdersRepository(IConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<CreateOrderDTO> GetById(long orderId)
        {
            using var con = _factory.GetDbConnection;

            var query = @$"SELECT * FROM Orders WHERE Id = {orderId} AND Status = {(long)OrderTypes.Initialized};";

            var result = await con.QueryFirstOrDefaultAsync<CreateOrderDTO>(query);

            return result;
        }

        public async Task<ServiceResponse> PostCreateOrder(CreateOrderDTO request, long userId)
        {
            using var con = _factory.GetDbConnection;

            var query = @$"INSERT INTO Orders (OrganizationId,
                                               CustomerId, 
                                               PaymentMethodId, 
                                               Amount, 
                                               Items,
                                               Discount, 
                                               Installments, 
                                               DeliveryType, 
                                               Status, 
                                               CreatedBy,
                                               CreatedDate)
                                        VALUES(@OrganizationId, 
                                               @CustomerId, 
                                               @PaymentMethodId, 
                                               @Amount,
                                               @Items, 
                                               @Discount, 
                                               @Installments,
                                               @DeliveryType, 
                                               {(long)OrderTypes.Initialized},
                                               {userId}, 
                                               CURRENT_TIMESTAMP);
                           SELECT LAST_INSERT_ID();";

            var orderId = await con.QuerySingleAsync<long>(query, request);

            foreach (var product in request.Products)
            {
                query = $@"INSERT INTO CustomerProducts (CustomerId,
                                                         OrderId,
                                                         ProductId, 
                                                         Quantity, 
                                                         Price, 
                                                         Discount, 
                                                         CreatedBy, 
                                                         CreatedDate)
                                                  VALUES(@CustomerId,
                                                         @OrderId,
                                                         @ProductId,
                                                         @Quantity, 
                                                         @Price,
                                                         @Discount, 
                                                         {userId},
                                                         CURRENT_TIMESTAMP);";

                await con.ExecuteAsync(query, new
                {
                    request.CustomerId,
                    OrderId = orderId,
                    ProductId = product.Id,
                    product.Quantity,
                    product.Price,
                    Discount = 0,
                    CreatedBy = userId,
                });
            }

            return new ServiceResponse
            {
                Metadata = new Metadata
                {
                    Message = "Success",
                    Status = System.Net.HttpStatusCode.OK
                },
                Data = new Data
                {
                    Id = orderId
                }
            };
        }

        public async Task<ServiceResponse> PutAddItemsToOrder(UpdateOrderDTO request, long userId)
        {
            using var con = _factory.GetDbConnection;

            var query = @$"UPDATE Orders SET Items = {request.Items}, ModifiedBy = {userId}, ModifiedDate = CURRENT_TIMESTAMP WHERE Id = {request.Id} AND Status = {(long)OrderTypes.Initialized};";

            var result = await con.ExecuteAsync(query);

            return new ServiceResponse
            {
                Metadata = new Metadata
                {
                    Message = "Success",
                    Status = System.Net.HttpStatusCode.OK
                },
                Data = new Data
                {
                    Id = result,
                }
            };
        }
        
        public async Task<ServiceResponse> PutFinishOrder(long orderId, long userId)
        {
            using var con = _factory.GetDbConnection;

            var query = @$"UPDATE Orders SET Status = {OrderTypes.Finished}, ModifiedBy = {userId}, ModifiedDate = CURRENT_TIMESTAMP WHERE Id = {orderId};";

            var result = await con.ExecuteAsync(query);

            return new ServiceResponse
            {
                Metadata = new Metadata
                {
                    Message = "Success",
                    Status = System.Net.HttpStatusCode.OK
                },
                Data = new Data
                {
                    Id = result,
                }
            };
        }
    }
}
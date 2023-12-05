using AutoMapper;
using Ecommerce.DataAccessLayer.Entities.Order;
using Ecommerce.DataAccessLayer.Models;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using Ecommerce.Services.Interfaces;
using Ecommerce.Utils.Settings;
using Microsoft.Extensions.Options;

namespace Ecommerce.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly IOrdersRepository _ordersRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public OrdersService(IOrdersRepository ordersRepository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _ordersRepository = ordersRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public async Task<CreateOrderDTO> GetById(long orderId)
        {
            var response = await _ordersRepository.GetById(orderId);

            return response;
        }

        public async Task<ServiceResponse> PostCreateOrder(CreateOrderDTO request, long userId)
        {
            var response = await _ordersRepository.PostCreateOrder(request, userId);

            return response;
        }

        public async Task<ServiceResponse> PutAddItemsToOrder(UpdateOrderDTO request, long userId)
        {
            var response = await _ordersRepository.PutAddItemsToOrder(request, userId);

            return response;
        }
    }
}
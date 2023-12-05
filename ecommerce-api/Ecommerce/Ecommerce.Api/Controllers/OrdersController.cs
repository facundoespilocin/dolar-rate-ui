using Microsoft.AspNetCore.Mvc;
using Ecommerce.Services.Interfaces;
using Ecommerce.DataAccessLayer.Entities.Order;

namespace Ecommerce.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly IOrdersService _ordersService;

        public OrdersController(ILogger<OrdersController> logger, IOrdersService ordersService)
        {
            _logger = logger;
            _ordersService = ordersService;
        }

        [HttpPost]
        public async Task<IActionResult> PostCreateOrder([FromBody] CreateOrderDTO request)
        {
            var result = await _ordersService.PostCreateOrder(request, 1);

            Thread.Sleep(1000);
            return Ok(result);
        }

        [HttpPut()]
        public async Task<IActionResult> PutAddItemsToOrder([FromBody] UpdateOrderDTO request)
        {
            var result = await _ordersService.PutAddItemsToOrder(request, 1);

            Thread.Sleep(1000);

            return Ok(result);
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetById(long orderId)
        {
            var result = await _ordersService.GetById(orderId);

            return Ok(result);
        }
    }
}
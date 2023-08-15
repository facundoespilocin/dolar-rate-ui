using Microsoft.AspNetCore.Mvc;
using Ecommerce.Services.Interfaces;
using static Ecommerce.Utils.Enums;
using Ecommerce.DataAccessLayer.Models;
using Ecommerce.Services;

namespace Ecommerce.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly ICustomersService _customersService;

        public CustomersController(ILogger<ProductsController> logger, ICustomersService customersService)
        {
            _logger = logger;
            _customersService = customersService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SearchRequest request)
        {
            var result = await _customersService.GetAll(request);

            return Ok(result);
        }
    }
}
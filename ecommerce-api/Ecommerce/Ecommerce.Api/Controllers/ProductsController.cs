using Microsoft.AspNetCore.Mvc;
using Ecommerce.Services.Interfaces;
using static Ecommerce.Utils.Enums;

namespace Ecommerce.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly IProductsService _productsService;

        public class ReadProducts
        {
            public IFormFile File { get; set; }
            public DataSourceTypes DataSource { get; set; }
        }

        public ProductsController(ILogger<ProductsController> logger, IProductsService productsService)
        {
            _logger = logger;
            _productsService = productsService;
        }

        [HttpPost("read-products")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetReadProducts([FromForm] ReadProducts request)
        {
            var result = await _productsService.ReadProducts(request.File, request.DataSource);

            return Ok(result);
        }

        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IActionResult> Get()
        //{
        //    var result = await _userService.GetAll();

        //    return Ok(result);
        //}


        //[HttpGet("{userId}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IActionResult> GetById(int userId)
        //{
        //    var result = await _userService.GetById(userId);

        //    return Ok(result);
        //}

        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> Create(CreateUserRequest user)
        //{
        //    var result = await _userService.Create(user);

        //    if (result.Metadata.Status == System.Net.HttpStatusCode.BadRequest)
        //    {
        //        return BadRequest(result);
        //    }
        //    else
        //    {
        //        return Ok(result);
        //    }
        //}

        //[HttpPut]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> Update(User user)
        //{
        //    await _userService.UpdateUser(user);

        //    return Ok();
        //}

        //[HttpDelete("{userId}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> Delete(int userId)
        //{
        //    //var result = await _userRepository.GetById(id);

        //    //if (result == null)
        //    //    return BadRequest("User to delete not found");

        //    //await _userRepository.Delete(id);
        //    return Ok();
        //}
    }
}
using Microsoft.AspNetCore.Mvc;
using Ecommerce.Services.Interfaces;
using Ecommerce.DataAccessLayer.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Ecommerce.DataAccessLayer.Models;
using Newtonsoft.Json;

namespace Ecommerce.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            var result = await _userService.GetAll();

            return Ok(result);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetById(int userId)
        {
            var result = await _userService.GetById(userId);

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create(User user)
        {
            await _userService.Create(user);

            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(User user)
        {
            await _userService.UpdateUser(user);
         
            return Ok();
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int userId)
        {
            //var result = await _userRepository.GetById(id);

            //if (result == null)
            //    return BadRequest("User to delete not found");

            //await _userRepository.Delete(id);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(JsonConvert.SerializeObject(ModelState.Values.Select(e => e.Errors).ToList()));
            }

            var response = await _userService.Authenticate(request);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(JsonConvert.SerializeObject(ModelState.Values.Select(e => e.Errors).ToList()));
            }

            var response = await _userService.UpdateUserPassword(request);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(JsonConvert.SerializeObject(ModelState.Values.Select(e => e.Errors).ToList()));
            }

            await _userService.PostForgotPassword(request.Email);

            return Ok();
        }
    }
}
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.User;
using WebApi.Entities;
using WebApi.Services.UserService;

namespace WebApi.Controllers.UserController
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "2")]
        [HttpGet]
        public async Task<ActionResult<UserViewIdModel>> GetById()
        {

            try
            {
                var data = await _userService.GetByIdAsync(Convert.ToInt32(UserId));
                return Ok(data);
            }
            catch (Exception ex)
            {

                return NotFound(new { message = ex.Message });
            }

        }
        [Authorize(Roles = "2")]
        [HttpPut]
        public async Task<ActionResult> Update([FromBody] UserUpdateModel model)
        {
            try
            {
                await _userService.UpdateAsync(Convert.ToInt32(UserId), model);
                return Ok("Güncelleme Başarılı");
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }

        }

    }
}
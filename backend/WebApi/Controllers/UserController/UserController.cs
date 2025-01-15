using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.AdminDTOs;
using WebApi.DTOs.User;
using WebApi.Exceptions;
using WebApi.Services;
using WebApi.Services.UserService;

namespace WebApi.Controllers.UserController.UserController
{
    [ApiController]
    [Route("[controller]s")]
    public class UserController : BaseController
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Me")]
        public async Task<ActionResult> GetCurrentUserType()
        {
            var data = await _userService.GetUserInfoValidation(Convert.ToInt32(UserId));
            return Ok(data);
        }

        [HttpGet("CheckMe")]
        public async Task<ActionResult<bool>> CheckMe([FromQuery] UserInfo data)
        {
            return await _userService.checkMe(data);
        }

        [Authorize(Roles = "1,2")]
        [HttpGet("OwnInfo")]
        public async Task<ActionResult> GetOwnInfo()
        {

            var data = await _userService.GetOwnInfo(Convert.ToInt32(UserId));
            return Ok(data);


        }

        [Authorize(Roles = "1,2")]
        [HttpPut("OwnInfo")]
        public async Task<ActionResult> UpdateOwnInfo([FromBody] UserUpdateModel model)
        {
            await _userService.UpdateOwnInfo(Convert.ToInt32(UserId), model);
            return Ok("Bilgiler güncellendi");
        }


        [Authorize(Roles = "1,2")]
        [HttpDelete("OwnAccountDelete")]
        public async Task<ActionResult> DeleteUserAsync()
        {
            await _userService.DeleteAsync(Convert.ToInt32(UserId));
            return Ok("Silme başarılı");
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public async Task<ActionResult<List<AdminUserViewModel>>> GetAllUsers()
        {
            var data = await _userService.GetAllAsync();
            return Ok(data);
        }

        [Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminUserViewIdModel>> GetUserById(int id)
        {
            var data = await _userService.GetByIdAsync(id);
            return Ok(data);
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUserAsync(int id, [FromBody] AdminUserUpdateModel model)
        {

            await _userService.UpdateAsync(id, model);
            return Ok("Kullanıcı güncellendi");

        }

        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserAsync(int id)
        {
            await _userService.DeleteAsync(id);
            return Ok("Silme başarılı");
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}/is-active")]
        public async Task<ActionResult> ActivateUser(int id)
        {
            await _userService.ActivateUserAsync(id);
            return Ok("Kullanıcı aktifleştirildi");
        }


    }
}
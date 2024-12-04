using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Auth;
using WebApi.Services.AuthService;
using WebApi.Services.TokenService;

namespace WebApi.Controllers.AuthController
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("/Register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel model)
        {
            try
            {
                await _authService.Register(model);
                return Ok("Kullanıcı Kaydı başarılı.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu hatası: {ex.Message}");
            }
        }

        [HttpPost("/Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var tokens = await _authService.Login(email, password);
            return Ok(tokens);
        }

        [HttpPost("/RefreshAccessToken")]
        public async Task RefreshAccessToken(string refreshToken)
        {

        }


    }
}
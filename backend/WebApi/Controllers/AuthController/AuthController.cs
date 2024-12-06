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
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
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
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var tokens = await _authService.Login(model.Email, model.Password);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddHours(30),
            };
            Response.Cookies.Append("refreshToken", tokens.RefreshToken, cookieOptions);

            return Ok(tokens.AccessToken);
        }


        [HttpPost("/RefreshAccessToken")]
        public async Task<IActionResult> RefreshTokens()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var newAccessToken = await _authService.RefreshAccessToken(refreshToken);
            return Ok(newAccessToken);
        }

        [HttpGet("/Logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            await _authService.Logout(refreshToken);
            Response.Cookies.Delete("refreshToken");
            return Ok("Çıkış Yapıldı");
        }


    }
}
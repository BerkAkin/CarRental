using System.Data;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Auth;
using WebApi.Exceptions;
using WebApi.Services.AuthService;


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

            await _authService.Register(model);
            return Ok("Kullanıcı Kaydı başarılı.");

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
                Expires = DateTime.Now.AddDays(7),
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
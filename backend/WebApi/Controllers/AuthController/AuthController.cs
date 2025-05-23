
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Auth;
using WebApi.Entities;
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
                Expires = DateTime.UtcNow.AddDays(3),
            };
            Response.Cookies.Append("refreshToken", tokens.RefreshToken, cookieOptions);

            return Ok(tokens.AccessToken);

        }


        [HttpPost("/RefreshAccessToken")]
        public async Task<IActionResult> RefreshAccessToken()
        {
            var oldRefreshToken = Request.Cookies["refreshToken"];
            var tokens = await _authService.RefreshAccessToken(oldRefreshToken);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(3),
            };
            Response.Cookies.Delete("refreshToken");
            Response.Cookies.Append("refreshToken", tokens.RefreshToken, cookieOptions);

            return Ok(new { accessToken = tokens.AccessToken });
        }



        [HttpGet("/Logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            await _authService.Logout(refreshToken);
            Response.Cookies.Delete("refreshToken");
            return Ok("Çıkış Yapıldı");

        }

        [HttpPost("/ResetPasswordRequest")]
        public async Task<ActionResult> ResetPasswordRequest([FromBody] ResetPasswordRequest request)
        {
            await _authService.ResetPasswordRequest(request);
            return Ok("Parolama Sıfırlama Maili Gönderildi");
        }


        [HttpPost("/ResetPassword")]
        public async Task<ActionResult> ResetPassword([FromBody] ResetPassword request)
        {
            await _authService.ResetPassword(request);
            return Ok("Parolama Sıfırlama İşlemi Başarılı Lütfen Yeniden Giriş Yapınız. 3 Saniye İçinde Yönlendiriliyor");
        }


    }
}
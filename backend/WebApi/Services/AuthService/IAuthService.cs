using WebApi.DTOs.Auth;
using WebApi.DTOs.Token;
using WebApi.Entities;

namespace WebApi.Services.AuthService
{
    public interface IAuthService
    {
        Task<TokenResponseModel> Login(string email, string password);
        Task Register(RegisterModel model);
    }
}
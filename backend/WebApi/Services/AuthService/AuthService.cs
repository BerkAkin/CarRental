using System.Data;
using AutoMapper;
using WebApi.DTOs.Auth;
using WebApi.DTOs.Token;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Repositories.AuthRepository;
using WebApi.Services.TokenService;

namespace WebApi.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly AuthRepository _repository;
        private readonly IMapper _mapper;
        private readonly PasswordHasher _passwordHasher;
        private readonly JwtTokenService _tokenService;

        public AuthService(AuthRepository repository, IMapper mapper, PasswordHasher passwordHasher, JwtTokenService tokenService)
        {
            _repository = repository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
        }


        public async Task Register(RegisterModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException("Veri Boş Olamaz");
            }
            if (model.Password.Length < 8)
            {
                throw new InvalidOperationException("Parola 8 karakterden küçük olamaz");
            }

            var user = await _repository.FindUser(model.Email.ToLower());

            if (user is not null)
            {
                throw new DuplicateNameException("E-mail zaten mevcut");
            }

            model.Password = _passwordHasher.HashPassword(model.Password);
            model.Email = model.Email.ToLower();

            var entity = _mapper.Map<User>(model);
            await _repository.Register(entity);


        }

        public async Task<TokenResponseModel> Login(string email, string password)
        {
            var user = await _repository.FindUser(email.ToLower());
            if (user is null)
            {
                throw new KeyNotFoundException("Kullanıcı Bulunamadı");
            }
            if (!_passwordHasher.VerifyPassword(password, user.PasswordHashed))
            {
                throw new InvalidOperationException("Parola Yanlış");
            }

            if (user.RefreshToken == null || user.RefreshTokenExpiryTime < DateTime.Now)
            {
                var refreshToken = _tokenService.GenerateRefreshToken();
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(3);
                await _repository.SaveUserRefreshToken(user);
            }
            var accessToken = _tokenService.GenerateAccessToken(user);

            var response = new TokenResponseModel
            {
                AccessToken = accessToken,
                RefreshToken = user.RefreshToken
            };

            return (response);
        }


        public async Task<string> RefreshAccessToken(string refreshToken)
        {
            var user = await _repository.GetUserByRefreshToken(refreshToken);

            if (user.RefreshToken == null || user.RefreshTokenExpiryTime < DateTime.Now)
            {
                var refreshedToken = _tokenService.GenerateRefreshToken();
                user.RefreshToken = refreshedToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(3);
                await _repository.SaveUserRefreshToken(user);
            }
            var newAccessToken = _tokenService.GenerateAccessToken(user);
            return newAccessToken;
        }

    }
}
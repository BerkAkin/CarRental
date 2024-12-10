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


            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await _repository.UpdateUser(user);

            var accessToken = _tokenService.GenerateAccessToken(user);

            var response = new TokenResponseModel
            {
                AccessToken = accessToken,
                RefreshToken = user.RefreshToken
            };

            return response;
        }


        public async Task<string> RefreshAccessToken(string refreshToken)
        {
            var user = await _repository.GetUserByRefreshToken(refreshToken);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Kullanıcı bulunamadı veya refresh token geçersiz.");
            }

            if (user.RefreshTokenExpiryTime < DateTime.Now)
            {
                throw new UnauthorizedAccessException("Refresh token süresi dolmuş. Yeniden Giriş Yapılmalı");
            }

            string accessToken = _tokenService.GenerateAccessToken(user);

            return accessToken;

        }

        public async Task Logout(string refreshToken)
        {
            var user = await _repository.GetUserByRefreshToken(refreshToken);
            if (user is null)
            {
                throw new InvalidOperationException("Kullanıcı bulunamadı");
            }
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = DateTime.Now;
            await _repository.UpdateUser(user);

        }

    }
}
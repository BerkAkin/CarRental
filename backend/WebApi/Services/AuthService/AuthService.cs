using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Common;
using WebApi.DTOs.Auth;
using WebApi.DTOs.Token;
using WebApi.Entities;
using WebApi.Exceptions;
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

            var user = await _repository.FindUser(model.Email.ToLower());
            if (user is not null)
            {
                throw new DuplicateNameException(ErrorMessages.EMAIL_EXISTS);
            }

            model.Password = _passwordHasher.HashPassword(model.Password);
            model.Email = model.Email.ToLower();

            try
            {
                var entity = _mapper.Map<User>(model);
                await _repository.Register(entity);
            }
            catch (Exception ex)
            {

                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }

        public async Task<TokenResponseModel> Login(string email, string password)
        {

            var user = await _repository.FindUser(email.ToLower());
            if (user is null)
            {
                throw new KeyNotFoundException(ErrorMessages.USER_NOT_FOUND);
            }
            if (!_passwordHasher.VerifyPassword(password, user.PasswordHashed))
            {
                throw new InvalidOperationException(ErrorMessages.PASSWORD_ERROR);
            }

            try
            {
                var refreshToken = _tokenService.GenerateRefreshToken();
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
                user.IsActive = true;
                await _repository.UpdateUser(user);

                var accessToken = _tokenService.GenerateAccessToken(user);

                var response = new TokenResponseModel
                {
                    AccessToken = accessToken,
                    RefreshToken = user.RefreshToken
                };

                return response;
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }


        public async Task<string> RefreshAccessToken(string refreshToken)
        {

            var user = await _repository.GetUserByRefreshToken(refreshToken);

            if (user == null)
            {
                throw new UnauthorizedAccessException(ErrorMessages.NO_USER_OR_REFRESH_TOKEN);
            }

            if (user.RefreshTokenExpiryTime < DateTime.Now)
            {
                throw new UnauthorizedAccessException(ErrorMessages.REFRESH_TOKEN_EXPIRED_LOGIN_NEEDED);
            }

            try
            {
                string accessToken = _tokenService.GenerateAccessToken(user);
                return accessToken;
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }

        public async Task Logout(string refreshToken)
        {

            var user = await _repository.GetUserByRefreshToken(refreshToken);
            if (user is null)
            {
                throw new KeyNotFoundException(ErrorMessages.NO_LOGGED_IN_USER);
            }
            try
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = DateTime.Now;
                await _repository.UpdateUser(user);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }
        }

    }
}
using System.Data;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using WebApi.Common;
using WebApi.DTOs.Auth;
using WebApi.DTOs.Token;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Helpers;
using WebApi.Repositories.AuthRepository;
using WebApi.Services.GeneralServices.EmailService;
using WebApi.Services.TokenService;
using WebApi.Validators;
using WebApi.Validators.Auth;

namespace WebApi.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly AuthRepository _repository;
        private readonly IMapper _mapper;
        private readonly PasswordHasher _passwordHasher;
        private readonly JwtTokenService _tokenService;
        private readonly EmailService _emailService;

        public AuthService(AuthRepository repository, IMapper mapper, PasswordHasher passwordHasher, JwtTokenService tokenService, EmailService emailService)
        {
            _repository = repository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
            _emailService = emailService;
        }


        public async Task Register(RegisterModel model)
        {
            RegisterValidator validator = new RegisterValidator();
            validator.ValidateAndThrow(model);
            model.Email = model.Email.ToLower();

            var user = await _repository.FindUser(model.Email.ToLower());
            if (user is not null)
            {
                throw new DuplicateNameException(ErrorMessages.EMAIL_EXISTS);
            }

            model.Password = _passwordHasher.HashPassword(model.Password);
            var entity = _mapper.Map<User>(model);
            entity.ResetToken = Guid.NewGuid().ToString();
            entity.ResetTokenExpiryTime = DateTime.UtcNow.AddMinutes(15);

            try
            {
                await _repository.Register(entity);
            }
            catch (Exception)
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
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(3);
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


        public async Task<TokenResponseModel> RefreshAccessToken(string refreshToken)
        {

            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new RefreshException(ErrorMessages.REFRESH_TOKEN_EXPIRED_LOGIN_NEEDED);
            }

            var user = await _repository.GetUserByRefreshToken(refreshToken);
            if (user == null)
            {
                throw new UnauthorizedAccessException(ErrorMessages.NO_USER_OR_REFRESH_TOKEN);
            }

            if (user.RefreshTokenExpiryTime < DateTime.Now)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;
                await _repository.UpdateUser(user);
                throw new RefreshException(ErrorMessages.REFRESH_TOKEN_EXPIRED_LOGIN_NEEDED);
            }

            try
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;


                string newRefreshToken = _tokenService.GenerateRefreshToken();
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(3);
                user.RefreshToken = newRefreshToken;
                await _repository.UpdateUser(user);

                string newAccessToken = _tokenService.GenerateAccessToken(user);
                var response = new TokenResponseModel
                {
                    AccessToken = newAccessToken,
                    RefreshToken = user.RefreshToken
                };

                return response;
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ex.Message);
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
                user.RefreshTokenExpiryTime = null;
                await _repository.UpdateUser(user);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }
        }









        public async Task ResetPasswordRequest(ResetPasswordRequest request)
        {
            var user = await _repository.FindUser(request.Email);
            if (user is null)
            {
                throw new KeyNotFoundException(ErrorMessages.EMAIL_DOES_NOT_EXISTS);
            }
            try
            {
                user.ResetToken = Guid.NewGuid().ToString();
                user.ResetTokenExpiryTime = DateTime.UtcNow.AddMinutes(15);

                await _repository.UpdateUser(user);
                var resetLink = $"http://localhost:3000/resetPassword?email={user.Email}&token={user.ResetToken}";

                var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "email.html");
                var emailBody = File.ReadAllText(templatePath);
                emailBody = emailBody.Replace("{{resetLink}}", resetLink);

                await _emailService.SendEmailAsync(user.Email, "Şifre Sıfırlama Talebi", emailBody);
            }
            catch (Exception e)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }
        }




        public async Task ResetPassword(ResetPassword model)
        {
            var user = await _repository.FindUser(model.Email);
            if (user is null || user.ResetToken != model.Token || user.ResetTokenExpiryTime < DateTime.UtcNow)
            {
                throw new InvalidOperationException(ErrorMessages.PASSWORD_TOKEN_RESET_ERROR);
            }
            try
            {
                user.PasswordHashed = _passwordHasher.HashPassword(model.NewPassword);
                user.ResetToken = null;
                user.ResetTokenExpiryTime = null;
                await _repository.UpdateUser(user);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }



    }
}
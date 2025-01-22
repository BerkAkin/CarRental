using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebApi.Common;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.TokenRepository;

namespace WebApi.Services.TokenService
{
    public class JwtTokenService
    {
        private readonly IConfiguration _config;
        private readonly TokenRepository _repository;

        public JwtTokenService(IConfiguration config, TokenRepository repository)
        {
            _config = config;
            _repository = repository;
        }

        public string GenerateAccessToken(User user)
        {
            try
            {
                var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.RoleId.ToString())
            };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: creds
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }



        }

        public string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }

        public async void RevokeRefreshToken(User user)
        {
            try
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = DateTime.MinValue;
                await _repository.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }






    }
}
using carRental.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace carRental.API.Repository.token
{
    public interface ITokenRepository
    {
        string GenerateJWTToken(IdentityUser user, List<string> roles);
        //Task<User?> GetUserInfoByIdAsync(Guid Id);
    }
}

using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.AuthRepository
{
    public class AuthRepository
    {
        private readonly CRDbContext _context;
        public AuthRepository(CRDbContext context)
        {
            _context = context;
        }

        public async Task Register(User entity)
        {
            await _context.Set<User>().AddAsync(entity);
            await _context.SaveChangesAsync();

            var user = await FindUser(entity.Email);
            await _context.UserComments.AddAsync(new UserComment
            {
                Content = "",
                UserId = user.Id,
                StarCount = 1,

            });
            await _context.SaveChangesAsync();

        }

        public async Task<User> FindUser(string email)
        {
            var user = await _context.Set<User>().SingleOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task UpdateUser(User user)
        {
            _context.Set<User>().Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserByRefreshToken(string refreshToken)
        {
            return _context.Users.SingleOrDefault(u => u.RefreshToken == refreshToken);
        }


    }
}
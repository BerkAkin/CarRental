using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.DTOs.User;
using WebApi.Entities;

namespace WebApi.Repositories.UserRepository
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(CRDbContext context) : base(context) { }

        public async Task<User> getUserInfoValidation(int id)
        {
            return await _context.Users.Where(user => user.Id == id).SingleOrDefaultAsync();
        }

        public async Task<User> checkMe(UserInfo data)
        {
            return await _context.Users.Where(user => user.RoleId == data.RoleId && user.Email == data.Email).FirstOrDefaultAsync();
        }
    }
}
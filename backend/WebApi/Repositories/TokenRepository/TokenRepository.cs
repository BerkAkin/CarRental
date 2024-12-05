using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.TokenRepository
{
    public class TokenRepository
    {
        private readonly CRDbContext _context;
        public TokenRepository(CRDbContext context)
        {
            _context = context;
        }

        public async Task UpdateAsync(User entity)
        {
            _context.Set<User>().Update(entity);
            await _context.SaveChangesAsync();
        }


    }
}
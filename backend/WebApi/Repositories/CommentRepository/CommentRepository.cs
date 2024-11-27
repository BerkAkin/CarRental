using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.CommentRepository
{
    public class CommentRepository : BaseRepository<UserComment>
    {
        public CommentRepository(CRDbContext context) : base(context) { }

        public async Task<IEnumerable<UserComment>> GetLatest(Func<IQueryable<UserComment>, IQueryable<UserComment>> func = null)
        {
            IQueryable<UserComment> query = _context.Set<UserComment>();
            if (func != null)
            {
                query = func(query);
            }
            query = query.OrderByDescending(uc => uc.CreatedAt).Take(1);

            return await query.ToListAsync();
        }


    }
}
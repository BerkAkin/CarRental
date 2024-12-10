using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.CommentRepository
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
            query = query.OrderByDescending(uc => uc.CreatedAt).Take(5);

            return await query.ToListAsync();
        }

        public async Task<UserComment> FindCommentByUserId(int userId)
        {
            var comment = _context.UserComments.FirstOrDefault(uc => uc.UserId == userId);
            return comment;
        }

    }
}
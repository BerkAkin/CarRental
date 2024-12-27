using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.CommentRepository
{
    public class CommentRepository : BaseRepository<UserComment>
    {
        public CommentRepository(CRDbContext context) : base(context) { }


        public async Task<(IEnumerable<UserComment>, int)> GetAllPaginatedAsync(int pageNumber, int pageSize, Func<IQueryable<UserComment>, IQueryable<UserComment>> func = null)
        {
            IQueryable<UserComment> query = _context.Set<UserComment>();
            if (func != null)
            {
                query = func(query);
            }
            int totalCounts = await query.CountAsync();
            var paginatedData = await query.OrderByDescending(uc => uc.CreatedAt).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return (paginatedData, totalCounts);
        }

        public async Task<IEnumerable<UserComment>> GetLatest(Func<IQueryable<UserComment>, IQueryable<UserComment>> func = null)
        {
            IQueryable<UserComment> query = _context.Set<UserComment>();
            if (func != null)
            {
                query = func(query);
            }
            query = query.OrderByDescending(uc => uc.CreatedAt).Take(5).Where(cm => cm.IsActive == true);

            return await query.ToListAsync();
        }

        public async Task<UserComment> FindCommentByUserId(int userId)
        {
            var comment = _context.UserComments.FirstOrDefault(uc => uc.UserId == userId);
            return comment;
        }

    }
}
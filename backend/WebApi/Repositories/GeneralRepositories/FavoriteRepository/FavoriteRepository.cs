using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.FavoriteRepository
{
    public class FavoriteRepository : BaseRepository<UserFavorite>
    {
        public FavoriteRepository(CRDbContext context) : base(context) { }

        public async Task<IEnumerable<UserFavorite>> GetAllUserFavoritesAsync(Func<IQueryable<UserFavorite>, IQueryable<UserFavorite>> include = null)
        {
            IQueryable<UserFavorite> query = _context.Set<UserFavorite>();
            if (include != null)
            {
                query = include(query);
            }
            return await query.ToListAsync();
        }
    }
}
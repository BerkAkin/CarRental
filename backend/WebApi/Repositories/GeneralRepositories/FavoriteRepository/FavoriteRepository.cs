using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.DTOs.Favorites;
using WebApi.Entities;
using WebApi.Exceptions;

namespace WebApi.Repositories.GeneralRepositories.FavoriteRepository
{
    public class FavoriteRepository : BaseRepository<UserFavorite>
    {
        public FavoriteRepository(CRDbContext context) : base(context) { }

        public async Task<IEnumerable<UserFavorite>> GetOwnFavoritesAsync(Func<IQueryable<UserFavorite>, IQueryable<UserFavorite>> include = null)
        {

            IQueryable<UserFavorite> query = _context.Set<UserFavorite>();
            if (include != null)
            {
                query = include(query);
            }
            return await query.ToListAsync();


        }

        public async Task<UserFavorite> CheckFavorite(int UserId, int modelId)
        {

            return await _context.UserFavorites.SingleOrDefaultAsync(uf => uf.UserId == UserId && uf.ModelId == modelId);


        }

        public async Task AddFavorite(UserFavorite entity)
        {

            await _context.UserFavorites.AddAsync(entity);
            await _context.SaveChangesAsync();

        }
    }
}
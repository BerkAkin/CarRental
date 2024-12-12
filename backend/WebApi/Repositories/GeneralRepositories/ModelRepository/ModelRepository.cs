using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.ModelRepository
{
    public class ModelRepository : BaseRepository<Model>
    {
        public ModelRepository(CRDbContext context) : base(context)
        {

        }

        public override async Task<IEnumerable<Model>> GetAllAsync(Func<IQueryable<Model>, IQueryable<Model>> func = null)
        {
            IQueryable<Model> query = _context.Set<Model>();
            if (func != null)
            {
                query = func(query);
            }
            return await query.ToListAsync();
        }
    }
}
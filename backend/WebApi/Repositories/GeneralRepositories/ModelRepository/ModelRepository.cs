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

        public async Task<(IEnumerable<Model>, int TotalCounts)> GetAllPaginatedAsync(int pageNumber, int pageSize, string query, Func<IQueryable<Model>, IQueryable<Model>> func = null)
        {

            IQueryable<Model> data = _context.Set<Model>();
            if (func is not null)
            {
                data = func(data);
            }
            data = data.Where(x => x.BrandName.Contains(query) || x.ModelName.Contains(query));
            int totalCounts = await data.CountAsync();
            var paginatedData = await data.OrderByDescending(m => m.Id).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return (paginatedData, totalCounts);
        }








        public async Task<(IEnumerable<Model>, int TotalRecords)> GetAllSummaryPaginatedAsync(int pageNumber, int pageSize, Func<IQueryable<Model>, IQueryable<Model>> func = null)
        {

            IQueryable<Model> query = _context.Set<Model>();

            if (func != null)
            {
                query = func(query);

            }

            var totalRecords = await query.CountAsync();
            var paginatedData = await query.OrderByDescending(m => m.Id).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return (paginatedData, totalRecords);

        }

    }
}
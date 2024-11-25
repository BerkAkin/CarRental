using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Repository;

namespace WebApi.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        protected readonly CRDbContext _context;
        public BaseRepository(CRDbContext context)
        {
            _context = context;
        }


        //Lambda fonksiyonu (Func<IQueryable<T>, IQueryable<T>> include) 
        //diğer tarafta (query => query.Include(u=>u.X))'a denk gelir param1=query param2=query.Include(u=>u.X)'dir

        public virtual async Task<IEnumerable<T>> GetAllAsync(Func<IQueryable<T>, IQueryable<T>> include = null)
        {
            IQueryable<T> query = _context.Set<T>();
            if (include != null)
            {
                query = include(query);
            }

            return await query.ToListAsync();
        }


        public virtual async Task<T> GetByIdAsync(int id, Func<IQueryable<T>, IQueryable<T>> include = null)
        {
            IQueryable<T> query = _context.Set<T>().Where(e => EF.Property<int>(e, "Id") == id);

            if (include != null)
            {
                query = include(query);
            }

            return await query.FirstOrDefaultAsync();

        }

        public virtual async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
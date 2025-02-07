using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.ContactRepository
{
    public class ContactRepository : BaseRepository<Contact>
    {
        public ContactRepository(CRDbContext context) : base(context) { }

        public async Task<(IEnumerable<Contact>, int)> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            IQueryable<Contact> data = _context.Set<Contact>();
            int totalRecords = await data.CountAsync();
            var paginatedData = await data.OrderByDescending(x => x.Name).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return (paginatedData, totalRecords);
        }
    }
}
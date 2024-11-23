using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Repositories.FAQRepository
{
    public class FAQRepository : IRepository<FAQText>
    {
        private readonly CRDbContext _context;
        public FAQRepository(CRDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FAQText>> GetAllAsync()
        {
            return await _context.FAQTexts.ToListAsync();
        }

        public async Task<FAQText> GetByIdAsync(int id)
        {
            return await _context.FAQTexts.FindAsync(id);
        }

        public async Task AddAsync(FAQText entity)
        {
            _context.FAQTexts.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(FAQText entity)
        {
            _context.FAQTexts.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(FAQText entity)
        {
            _context.FAQTexts.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
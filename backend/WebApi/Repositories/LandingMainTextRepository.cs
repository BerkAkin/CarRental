using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repository
{
    public class LandingMainTextRepository : IRepository<LandingMainText>
    {
        private readonly CRDbContext _context;

        public LandingMainTextRepository(CRDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LandingMainText>> GetAllAsync()
        {
            return await _context.LandingPageMainTexts.ToListAsync();
        }

        public async Task<LandingMainText> GetByIdAsync(int id)
        {
            return await _context.LandingPageMainTexts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateAsync(LandingMainText entity)
        {
            _context.LandingPageMainTexts.Update(entity);
            await _context.SaveChangesAsync();
        }


    }
}
using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Repositories.LandingRepositories
{
    public class MainTextRepository : IRepository<LandingMainText>
    {
        private readonly CRDbContext _context;

        public MainTextRepository(CRDbContext context)
        {
            _context = context;
        }

        public Task AddAsync(LandingMainText entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(LandingMainText entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<LandingMainText>> GetAllAsync()
        {
            return await _context.LandingMainTexts.ToListAsync();
        }

        public async Task<LandingMainText> GetByIdAsync(int id)
        {
            return await _context.LandingMainTexts.FindAsync(id);
        }

        public async Task UpdateAsync(LandingMainText entity)
        {
            _context.LandingMainTexts.Update(entity);
            await _context.SaveChangesAsync();
        }


    }
}
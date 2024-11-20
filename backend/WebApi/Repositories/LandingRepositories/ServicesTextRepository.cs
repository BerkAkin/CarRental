using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Repositories.LandingRepositories
{
    public class ServiceTextRepository : IRepository<LandingServiceText>
    {
        private readonly CRDbContext _context;
        public ServiceTextRepository(CRDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LandingServiceText>> GetAllAsync()
        {
            return await _context.LandingServiceTexts.ToListAsync();
        }

        public async Task<LandingServiceText> GetByIdAsync(int id)
        {
            return await _context.LandingServiceTexts.FindAsync(id);
        }

        public async Task AddAsync(LandingServiceText entity)
        {
            _context.LandingServiceTexts.Add(entity);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(LandingServiceText entity)
        {
            _context.LandingServiceTexts.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(LandingServiceText entity)
        {
            _context.LandingServiceTexts.Remove(entity);
            await _context.SaveChangesAsync();
        }


    }
}
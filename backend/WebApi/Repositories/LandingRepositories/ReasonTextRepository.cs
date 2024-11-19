using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Repositories.LandingRepositories
{
    public class ReasonTextRepository : IRepository<LandingReasonText>
    {
        private readonly CRDbContext _context;
        public ReasonTextRepository(CRDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<LandingReasonText>> GetAllAsync()
        {
            return await _context.LandingReasonTexts.ToListAsync();
        }


        public async Task<LandingReasonText> GetByIdAsync(int id)
        {
            return await _context.LandingReasonTexts.FindAsync(id);
        }



        public async Task AddAsync(LandingReasonText entity)
        {
            _context.LandingReasonTexts.Add(entity);
            await _context.SaveChangesAsync();
        }



        public async Task UpdateAsync(LandingReasonText entity)
        {
            _context.LandingReasonTexts.Update(entity);
            await _context.SaveChangesAsync();
        }



        public async Task DeleteAsync(LandingReasonText entity)
        {
            _context.LandingReasonTexts.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
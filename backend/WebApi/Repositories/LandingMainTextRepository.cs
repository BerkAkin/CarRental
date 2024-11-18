using Microsoft.EntityFrameworkCore;
using WebApi.DbOperations;
using WebApi.DTOs;
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


    }
}
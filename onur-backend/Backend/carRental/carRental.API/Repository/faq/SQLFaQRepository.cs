using carRental.API.Data;
using carRental.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace carRental.API.Repository.faq
{
    public class SQLFaQRepository : IFaQRepository
    {
        private readonly CarRentalDbContext dbContext;

        public SQLFaQRepository(CarRentalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<FaQ>> GetAllAsync()
        {
            return await dbContext.FaQs.ToListAsync();
        }

        public async Task<FaQ?> GetByIdAsync(Guid Id)
        {
            return await dbContext.FaQs.FirstOrDefaultAsync(x => x.Id == Id);
        }
        
        public async Task<FaQ> CreateAsync(FaQ faq)
        {
            await dbContext.FaQs.AddAsync(faq);
            await dbContext.SaveChangesAsync();
            return faq;
        }
        
        public async Task<FaQ?> UpdateAsync(Guid Id, FaQ faq)
        {
            var faqExists = await dbContext.FaQs.FirstOrDefaultAsync(x => x.Id == Id);
            if (faqExists is null)
            {
                return null;
            }

            faqExists.Question = faq.Question;
            faqExists.Answer = faq.Answer;
            await dbContext.SaveChangesAsync();

            return faq;
        }  
        
        public async Task<FaQ?> DeleteAsync(Guid Id)
        {
            var faqExists = await dbContext.FaQs.FirstOrDefaultAsync(x => x.Id == Id);
            if (faqExists is null)
            {
                return null;
            }

            dbContext.FaQs.Remove(faqExists);
            await dbContext.SaveChangesAsync();

            return faqExists;
        }
    }
}

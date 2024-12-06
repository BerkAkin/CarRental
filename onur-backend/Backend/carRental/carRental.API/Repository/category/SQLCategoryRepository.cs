using carRental.API.Data;
using carRental.API.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace carRental.API.Repository.category
{
    public class SQLCategoryRepository : ICategoryRepository
    {
        private readonly CarRentalDbContext dbContext;

        public SQLCategoryRepository(CarRentalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
           
        public async Task<List<Category>> GetAllAsync()
        {
            return await dbContext.Categories.Include(x => x.Image).Where(c => c.Status).ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(Guid Id)
        {
            return await dbContext.Categories.Include(x => x.Image).Where(x => x.Status).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();
            return category;
        }

        public async Task<Category?> UpdateAsync(Guid Id, Category category)
        {
            var cateExists = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == Id);
            if (cateExists is null)
            {
                return null;
            }

            cateExists.CateVisit = category.CateVisit;
            cateExists.Name = category.Name;
            cateExists.Slug = category.Slug;
            cateExists.Description = category.Description;
            cateExists.Status = category.Status;
            cateExists.Popular = category.Popular;
            cateExists.MetaTitle = category.MetaTitle;
            cateExists.MetaDescription = category.MetaDescription;
            cateExists.MetaKeyword = category.MetaKeyword;
            cateExists.ImageId = category.ImageId;
            await dbContext.SaveChangesAsync();

            return category;
        } 
        
        //V1 is using it
        public async Task<Category?> DeleteAsync(Guid Id)
        {
            var cateExists = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == Id);
            if (cateExists is null)
            {
                return null;
            }

            dbContext.Categories.Remove(cateExists);
            await dbContext.SaveChangesAsync();

            return cateExists;
        }

        //V2 is using it
        public async Task<Category?> DeletePassiveAsync(Guid Id, bool status)
        {
            var cateExists = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == Id);
            if (cateExists is null)
            {
                return null;
            }

            cateExists.Status = status;
            await dbContext.SaveChangesAsync();

            return cateExists;
        }
    }
}

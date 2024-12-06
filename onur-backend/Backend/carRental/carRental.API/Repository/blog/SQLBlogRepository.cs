using carRental.API.Data;
using carRental.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace carRental.API.Repository.blog
{
    public class SQLBlogRepository : IBlogRepository
    {
        private readonly CarRentalDbContext dbContext;

        public SQLBlogRepository(CarRentalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Blog>> GetAllAsync()
        {
            return await dbContext.Blogs.Include(x => x.Image).ToListAsync();
        }

        public async Task<Blog?> GetByIdAsync(Guid Id)
        {
            return await dbContext.Blogs.Include(x => x.Image).FirstOrDefaultAsync(x => x.Id == Id);
        }
        
        public async Task<Blog> CreateAsync(Blog blog)
        {
            await dbContext.Blogs.AddAsync(blog);
            await dbContext.SaveChangesAsync();
            return blog;
        }

        public async Task<Blog?> UpdateAsync(Guid Id, Blog blog)
        {
            var blogExists = await dbContext.Blogs.FirstOrDefaultAsync(x => x.Id == Id);
            if (blogExists is null)
            {
                return null;
            }

            blogExists.ImageId = blog.ImageId;
            blogExists.BlogCategory = blog.BlogCategory;
            blogExists.Slug = blog.Slug;
            blogExists.Question = blog.Question;
            blogExists.Answer = blog.Answer;
            await dbContext.SaveChangesAsync();

            return blog;
        }   
        
        public async Task<Blog?> DeleteAsync(Guid Id)
        {
            var blogExists = await dbContext.Blogs.FirstOrDefaultAsync(x => x.Id == Id);
            if (blogExists is null)
            {
                return null;
            }

            dbContext.Blogs.Remove(blogExists);
            await dbContext.SaveChangesAsync();

            return blogExists;
        }
    }
}

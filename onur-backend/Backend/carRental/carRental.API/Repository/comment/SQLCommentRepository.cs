using carRental.API.Data;
using carRental.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace carRental.API.Repository.comment
{
    public class SQLCommentRepository : ICommentRepository
    {
        private readonly CarRentalDbContext dbContext;
       
        public SQLCommentRepository(CarRentalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await dbContext.Comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(Guid Id)
        {
            return await dbContext.Comments.FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            await dbContext.Comments.AddAsync(comment);
            await dbContext.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment?> UpdateAsync(Guid Id, Comment comment)
        {
            var commExists = await dbContext.Comments.FirstOrDefaultAsync(x => x.Id == Id);
            if (commExists is null)
            {
                return null;
            }

            commExists.Name = comment.Name;
            commExists.Description = comment.Description;
            commExists.StarRate = comment.StarRate;
            commExists.UserTitle = comment.UserTitle;
            await dbContext.SaveChangesAsync();

            return comment;
        }
               
        public async Task<Comment?> DeleteAsync(Guid Id)
        {
            var commExists = await dbContext.Comments.FirstOrDefaultAsync(x => x.Id == Id);
            if (commExists is null)
            {
                return null;
            }

            dbContext.Comments.Remove(commExists);
            await dbContext.SaveChangesAsync();

            return commExists;
        }

    }
}

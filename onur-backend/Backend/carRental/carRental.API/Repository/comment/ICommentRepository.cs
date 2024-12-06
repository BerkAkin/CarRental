using carRental.API.Models.Domain;

namespace carRental.API.Repository.comment
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync();
        Task<Comment?> GetByIdAsync(Guid Id);
        Task<Comment> CreateAsync(Comment comment);
        Task<Comment?> UpdateAsync(Guid Id, Comment comment);
        Task<Comment?> DeleteAsync(Guid Id);
    }
}

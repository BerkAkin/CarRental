using carRental.API.Models.Domain;

namespace carRental.API.Repository.blog
{
    public interface IBlogRepository
    {
        Task<List<Blog>> GetAllAsync();
        Task<Blog?> GetByIdAsync(Guid Id);
        Task<Blog> CreateAsync(Blog blog);
        Task<Blog?> UpdateAsync(Guid Id, Blog blog);
        Task<Blog?> DeleteAsync(Guid Id);
    }
}

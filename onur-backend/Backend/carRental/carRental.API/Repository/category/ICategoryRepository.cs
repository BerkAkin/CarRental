using carRental.API.Models.Domain;

namespace carRental.API.Repository.category
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(Guid Id);
        Task<Category> CreateAsync(Category category);
        Task<Category?> UpdateAsync(Guid Id, Category category);
        Task<Category?> DeleteAsync(Guid Id);
        Task<Category?> DeletePassiveAsync(Guid Id, bool status);
    }
}

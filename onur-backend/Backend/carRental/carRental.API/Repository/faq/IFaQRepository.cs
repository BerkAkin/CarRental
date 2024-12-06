using carRental.API.Models.Domain;

namespace carRental.API.Repository.faq
{
    public interface IFaQRepository
    {
        Task<List<FaQ>> GetAllAsync();
        Task<FaQ?> GetByIdAsync(Guid Id);
        Task<FaQ> CreateAsync(FaQ faq);
        Task<FaQ?> UpdateAsync(Guid Id, FaQ faq);
        Task<FaQ?> DeleteAsync(Guid Id);
    }
}

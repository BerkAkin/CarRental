using carRental.API.Models.Domain;

namespace carRental.API.Repository.image
{
    public interface IImageRepository
    {
        Task<Image> CreateAsync(Image image);
        Task<Image?> DeleteAsync(Guid Id);
    }
}

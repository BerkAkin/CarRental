using carRental.API.Models.Domain;

namespace carRental.API.Repository.car
{
    public interface ICarRepository
    {
        Task<List<Car>> GetAllAsync(int pageParam = 1, int pageSize = 10);
        Task<Car?> GetByIdAsync(Guid Id);
        Task<Car> CreateAsync(Car car);
        Task<Car?> UpdateAsync(Guid Id, Car car);
        Task<Car?> DeleteAsync(Guid Id);
    }
}

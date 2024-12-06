using carRental.API.Data;
using carRental.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace carRental.API.Repository.car
{
    public class SQLCarRepository : ICarRepository
    {
        private readonly CarRentalDbContext dbContext;

        public SQLCarRepository(CarRentalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Car>> GetAllAsync(int pageParam = 1, int pageSize = 10)
        {
            var cars = dbContext.Cars.Include(x => x.Image).Include(x => x.Category).Where(x => x.Status).AsQueryable();

            var pagination = (pageParam - 1) * pageSize;

            return await cars.Skip(pagination).Take(pageSize).ToListAsync();
        }

        public async Task<Car?> GetByIdAsync(Guid Id)
        {
            return await dbContext.Cars.Include(x => x.Image).Include(x => x.Category).Where(x => x.Status).FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<Car> CreateAsync(Car car)
        {
            await dbContext.Cars.AddAsync(car);
            await dbContext.SaveChangesAsync();
            return car;
        }

        public async Task<Car?> UpdateAsync(Guid Id, Car car)
        {
            var carExists = await dbContext.Cars.FirstOrDefaultAsync(x => x.Id == Id);
            if (carExists is null)
            {
                return null;
            }

            carExists.CategoryId = car.CategoryId;
            carExists.ImageId = car.ImageId;
            carExists.CarVisit = car.CarVisit;
            carExists.Brand = car.Brand;
            carExists.Name = car.Name;
            carExists.Slug = car.Slug;
            carExists.Class = car.Class;
            carExists.Fuel = car.Fuel;
            carExists.Shifter = car.Shifter;
            carExists.FamilyPrice = car.FamilyPrice;
            carExists.SeatQty = car.SeatQty;
            carExists.SellingPrice = car.SellingPrice;
            carExists.Qty = car.Qty;
            carExists.Status = car.Status;
            carExists.Trending = car.Trending;
            carExists.MetaTitle = car.MetaTitle;
            carExists.MetaDescription = car.MetaDescription;
            carExists.MetaKeyword = car.MetaKeyword;
            await dbContext.SaveChangesAsync();

            return car;
        }

        //V1 is using it
        public async Task<Car?> DeleteAsync(Guid Id)
        {
            var carExists = await dbContext.Cars.FirstOrDefaultAsync(x => x.Id == Id);
            if (carExists is null)
            {
                return null;
            }

            dbContext.Cars.Remove(carExists);
            await dbContext.SaveChangesAsync();

            return carExists;
        }

        //V2 is using it
        public async Task<Car?> DeletePassiveAsync(Guid Id, bool status)
        {
            var carExists = await dbContext.Cars.FirstOrDefaultAsync(x => x.Id == Id);
            if (carExists is null)
            {
                return null;
            }

            carExists.Status = status;
            await dbContext.SaveChangesAsync();

            return carExists;
        }
    }
}

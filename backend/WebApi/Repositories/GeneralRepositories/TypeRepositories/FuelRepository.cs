using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.TypeRepositories
{
    public class FuelRepository : BaseRepository<FuelType>
    {
        private readonly CRDbContext _context;
        public FuelRepository(CRDbContext context) : base(context) { }
    }
}
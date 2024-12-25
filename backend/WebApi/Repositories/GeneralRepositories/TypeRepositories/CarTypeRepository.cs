using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.TypeRepositories
{
    public class CarTypeRepository : BaseRepository<CarType>
    {
        private readonly CRDbContext _context;
        public CarTypeRepository(CRDbContext context) : base(context) { }
    }
}
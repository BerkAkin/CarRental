using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.TypeRepositories
{
    public class GearRepository : BaseRepository<GearType>
    {
        private readonly CRDbContext _context;
        public GearRepository(CRDbContext context) : base(context) { }
    }
}
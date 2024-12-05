using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.LandingRepositories
{
    public class ServiceTextRepository : BaseRepository<LandingServiceText>
    {
        public ServiceTextRepository(CRDbContext context) : base(context) { }
    }
}
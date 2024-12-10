using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.LandingRepositories
{
    public class ServiceTextRepository : BaseRepository<LandingServiceText>
    {
        public ServiceTextRepository(CRDbContext context) : base(context) { }
    }
}
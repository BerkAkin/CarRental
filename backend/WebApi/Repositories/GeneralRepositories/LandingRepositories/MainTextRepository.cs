using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.LandingRepositories
{
    public class MainTextRepository : BaseRepository<LandingMainText>
    {
        public MainTextRepository(CRDbContext context) : base(context) { }

    }
}
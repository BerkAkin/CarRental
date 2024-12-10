using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.LandingRepositories
{
    public class ReasonTextRepository : BaseRepository<LandingReasonText>
    {
        public ReasonTextRepository(CRDbContext context) : base(context) { }
    }
}
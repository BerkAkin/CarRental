using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.LandingRepositories
{
    public class ReasonTextRepository : BaseRepository<LandingReasonText>
    {
        public ReasonTextRepository(CRDbContext context) : base(context) { }
    }
}
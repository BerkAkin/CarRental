using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.FAQRepository
{
    public class FAQRepository : BaseRepository<FAQText>
    {
        public FAQRepository(CRDbContext context) : base(context) { }
    }
}
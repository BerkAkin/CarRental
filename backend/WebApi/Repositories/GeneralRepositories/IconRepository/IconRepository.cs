using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.IconRepository
{
    public class IconRepository : BaseRepository<Icon>
    {
        public IconRepository(CRDbContext context) : base(context) { }
    }
}
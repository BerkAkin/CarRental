using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.UserRepository
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(CRDbContext context) : base(context) { }

    }
}
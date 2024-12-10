using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.GeneralRepositories.LandingRepositories
{
    public class MainTextRepository : BaseRepository<LandingMainText>
    {
        public MainTextRepository(CRDbContext context) : base(context) { }
        public Task AddAsync(LandingMainText entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(LandingMainText entity)
        {
            throw new NotImplementedException();
        }
    }
}
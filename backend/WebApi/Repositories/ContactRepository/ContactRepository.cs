using WebApi.DbOperations;
using WebApi.Entities;

namespace WebApi.Repositories.ContactRepository
{
    public class ContactRepository : BaseRepository<Contact>
    {
        public ContactRepository(CRDbContext context) : base(context) { }
    }
}
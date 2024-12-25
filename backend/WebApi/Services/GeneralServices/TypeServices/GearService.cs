using AutoMapper;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.TypeRepositories;

namespace WebApi.Services.GeneralServices.TypeServices
{
    public class GearService : BaseService<GearType, object, object, GearType, object, GearRepository>
    {
        public GearService(GearRepository repository, IMapper mapper) : base(repository, mapper) { }
    }
}
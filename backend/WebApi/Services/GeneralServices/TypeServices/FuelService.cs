using AutoMapper;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.TypeRepositories;

namespace WebApi.Services.GeneralServices.TypeServices
{
    public class FuelService : BaseService<FuelType, object, object, FuelType, object, FuelRepository>
    {
        public FuelService(FuelRepository repository, IMapper mapper) : base(repository, mapper) { }
    }
}
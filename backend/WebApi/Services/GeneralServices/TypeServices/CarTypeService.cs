using AutoMapper;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.TypeRepositories;

namespace WebApi.Services.GeneralServices.TypeServices
{
    public class CarTypeService : BaseService<CarType, object, object, CarType, object, CarTypeRepository>
    {
        public CarTypeService(CarTypeRepository repository, IMapper mapper) : base(repository, mapper) { }
    }
}
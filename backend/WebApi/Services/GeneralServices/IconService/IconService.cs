using AutoMapper;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.IconRepository;

namespace WebApi.Services.GeneralServices.IconService
{
    public class IconService : BaseService<Icon, object, object, Icon, object, IconRepository>
    {
        public IconService(IconRepository repository, IMapper mapper) : base(repository, mapper) { }

    }
}
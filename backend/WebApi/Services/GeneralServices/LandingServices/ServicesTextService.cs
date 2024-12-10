using AutoMapper;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;
using WebApi.Repository;

namespace WebApi.Services.GeneralServices.LandingServices
{
    public class ServicesTextService : BaseService<LandingServiceText, LandingServiceAddModel, LandingServiceUpdateModel, LandingServiceViewModel, LandingServiceViewIdModel, ServiceTextRepository>
    {
        public ServicesTextService(ServiceTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
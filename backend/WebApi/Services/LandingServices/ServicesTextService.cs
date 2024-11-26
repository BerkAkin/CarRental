using AutoMapper;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.Entities;
using WebApi.Repositories.LandingRepositories;
using WebApi.Repository;

namespace WebApi.Services.LandingServices
{
    public class ServicesTextService : BaseService<LandingServiceText, LandingServiceAddModel, LandingServiceUpdateModel, LandingServiceViewModel, LandingServiceViewIdModel>
    {
        public ServicesTextService(ServiceTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
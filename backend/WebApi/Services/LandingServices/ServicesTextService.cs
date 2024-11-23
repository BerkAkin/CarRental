using AutoMapper;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.LandingServices
{
    public class ServicesTextService : BaseService<LandingServiceText, LandingServiceAddModel, LandingServiceUpdateModel, LandingServiceViewModel, LandingServiceViewIdModel>
    {
        public ServicesTextService(IRepository<LandingServiceText> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
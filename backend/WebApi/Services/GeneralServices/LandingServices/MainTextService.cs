using AutoMapper;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;


namespace WebApi.Services.GeneralServices.LandingServices
{
    public class MainTextService : BaseService<LandingMainText, object, LandingMainUpdateModel, LandingMainViewModel, LandingMainViewIdModel, MainTextRepository>
    {

        public MainTextService(MainTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }


    }
}
using AutoMapper;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;
using WebApi.Repository;

namespace WebApi.Services.GeneralServices.LandingServices
{
    public class MainTextService : BaseService<LandingMainText, object, LandingMainUpdateModel, LandingMainViewModel, LandingMainViewIdModel, MainTextRepository>
    {

        public MainTextService(MainTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override async Task AddAsync(object model)
        {
            throw new NotSupportedException("Desteklenmeyen Özellik");

        }

        public override async Task DeleteAsync(int id)
        {
            throw new NotSupportedException("Desteklenmeyen Özellik");
        }


    }
}
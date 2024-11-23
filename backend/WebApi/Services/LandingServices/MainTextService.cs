using AutoMapper;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.LandingServices
{
    public class MainTextService : BaseService<LandingMainText, object, LandingMainUpdateModel, LandingMainViewModel, LandingMainViewIdModel>
    {

        public MainTextService(IRepository<LandingMainText> repository, IMapper mapper) : base(repository, mapper)
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
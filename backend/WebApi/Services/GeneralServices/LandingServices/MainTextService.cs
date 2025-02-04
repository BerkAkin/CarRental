using AutoMapper;
using FluentValidation;
using WebApi.Common;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;
using WebApi.Validators.LandingPage;


namespace WebApi.Services.GeneralServices.LandingServices
{
    public class MainTextService : BaseService<LandingMainText, object, LandingMainUpdateModel, LandingMainViewModel, LandingMainViewIdModel, MainTextRepository>
    {

        public MainTextService(MainTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override async Task UpdateAsync(int id, LandingMainUpdateModel model)
        {
            LandingMainValidator validator = new LandingMainValidator();
            validator.ValidateAndThrow(model);

            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERAL_UPDATE_FAIL);
            }

            _mapper.Map(model, entity);

            try
            {
                await _repository.UpdateAsync(entity);
            }
            catch (Exception)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }
        }
    }
}
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using WebApi.Common;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;
using WebApi.Repository;
using WebApi.Validators.LandingPage;

namespace WebApi.Services.GeneralServices.LandingServices
{
    public class ReasonTextService : BaseService<LandingReasonText, LandingReasonAddModel, LandingReasonUpdateModel, LandingReasonViewModel, LandingMainViewIdModel, ReasonTextRepository>
    {

        public ReasonTextService(ReasonTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override async Task UpdateAsync(int id, LandingReasonUpdateModel model)
        {
            LandingReasonValidator validator = new LandingReasonValidator();
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
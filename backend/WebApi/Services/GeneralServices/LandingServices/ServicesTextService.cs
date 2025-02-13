using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using WebApi.Common;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;
using WebApi.Repository;
using WebApi.Validators.LandingPage;

namespace WebApi.Services.GeneralServices.LandingServices
{
    public class ServicesTextService : BaseService<LandingServiceText, LandingServiceAddModel, LandingServiceUpdateModel, LandingServiceViewModel, LandingServiceViewIdModel, ServiceTextRepository>
    {
        public ServicesTextService(ServiceTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override async Task<List<LandingServiceViewModel>> GetAllAsync()
        {
            var data = await _repository.GetAllAsync(func => func.Include(x => x.Icon));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERAL_NOT_FOUND);
            }
            var dtoData = _mapper.Map<List<LandingServiceViewModel>>(data);
            return dtoData;
        }

        public override async Task<LandingServiceViewIdModel> GetByIdAsync(int id)
        {
            var data = await _repository.GetByIdAsync(id, func => func.Include(x => x.Icon));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERAL_NOT_FOUND);
            }
            var dtoData = _mapper.Map<LandingServiceViewIdModel>(data);
            return dtoData;
        }

        public override async Task UpdateAsync(int id, LandingServiceUpdateModel model)
        {
            LandingServiceValidator validator = new LandingServiceValidator();
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
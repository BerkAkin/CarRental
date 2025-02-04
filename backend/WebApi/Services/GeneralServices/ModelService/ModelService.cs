using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using WebApi.Common;
using WebApi.DTOs.Models;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.GeneralRepositories.ModelRepository;
using WebApi.Validators.Model;

namespace WebApi.Services.GeneralServices.ModelService
{
    public class ModelService : BaseService<Model, ModelAddModel, ModelUpdateModel, ModelViewModel, ModelViewIdModel, ModelRepository>
    {

        public ModelService(ModelRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }

        public virtual async Task AddAsync(ModelAddModel model)
        {
            ModelAddValidator validator = new ModelAddValidator();
            validator.ValidateAndThrow(model);
            var entity = _mapper.Map<Model>(model);
            try
            {
                await _repository.AddAsync(entity);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }

        public virtual async Task UpdateAsync(int id, ModelUpdateModel model)
        {
            ModelUpdateValidator validator = new ModelUpdateValidator();
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
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }



        }


        public async Task<(IEnumerable<ModelViewModel> Models, int TotalRecords)> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {

            var (data, totalRecords) = await _repository.GetAllPaginatedAsync(pageNumber, pageSize, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.MODELS_NOT_FOUND);
            }
            var DTOData = _mapper.Map<List<ModelViewModel>>(data);
            return (DTOData, totalRecords);


        }

        public override async Task<ModelViewIdModel> GetByIdAsync(int id)
        {

            var data = await _repository.GetByIdAsync(id, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.MODEL_NOT_FOUND);
            }
            return _mapper.Map<ModelViewIdModel>(data);


        }

        public async Task<(IEnumerable<ModelSummaryViewModel> Models, int TotalRecords)> GetPaginatedSummaryModels(int pageNumber, int pageSize)
        {

            var (data, totalRecords) = await _repository.GetAllSummaryPaginatedAsync(pageNumber, pageSize, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.MODELS_SUMMARY_NOT_FOUND);
            }
            var DTOData = _mapper.Map<List<ModelSummaryViewModel>>(data);
            return (DTOData, totalRecords);


        }


    }
}
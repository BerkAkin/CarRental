using AutoMapper;
using WebApi.Common;
using WebApi.Exceptions;
using WebApi.Repositories;
using WebApi.Repository;

namespace WebApi.Services
{
    public abstract class BaseService<TEntity, TAddModel, TUpdateModel, TViewModel, TViewIdModel, TRepository>
    where TEntity : class
    where TRepository : BaseRepository<TEntity>

    {
        protected readonly TRepository _repository;
        protected readonly IMapper _mapper;

        protected BaseService(TRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual async Task<List<TViewModel>> GetAllAsync()
        {

            var entities = await _repository.GetAllAsync();
            if (entities == null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERALS_NOT_FOUND);
            }
            return _mapper.Map<List<TViewModel>>(entities);


        }

        public virtual async Task<TViewIdModel> GetByIdAsync(int id)
        {

            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERAL_NOT_FOUND);
            }
            return _mapper.Map<TViewIdModel>(entity);


        }

        public virtual async Task AddAsync(TAddModel model)
        {

            var entity = _mapper.Map<TEntity>(model);
            try
            {
                await _repository.AddAsync(entity);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }

        public virtual async Task UpdateAsync(int id, TUpdateModel model)
        {

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

        public virtual async Task DeleteAsync(int id)
        {

            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERAL_DELETE_FAIL);
            }
            try
            {
                await _repository.DeleteAsync(entity);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }



        }


    }
}
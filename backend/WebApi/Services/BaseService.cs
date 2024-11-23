using AutoMapper;
using FluentValidation;
using WebApi.Repository;

namespace WebApi.Services
{
    public abstract class BaseService<TEntity, TAddModel, TUpdateModel, TViewModel, TViewIdModel> where TEntity : class
    {
        protected readonly IRepository<TEntity> _repository;
        protected readonly IMapper _mapper;

        protected BaseService(IRepository<TEntity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual async Task<List<TViewModel>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            if (entities == null)
            {
                throw new InvalidOperationException($"{typeof(TEntity).Name} Verileri Bulunamadı");
            }
            return _mapper.Map<List<TViewModel>>(entities);
        }

        public virtual async Task<TViewIdModel> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new InvalidOperationException($"{typeof(TEntity).Name} Verisi Bulunamadı");
            }
            return _mapper.Map<TViewIdModel>(entity);
        }

        public virtual async Task AddAsync(TAddModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException($"{typeof(TAddModel).Name} Boş Olamaz");
            }

            var entity = _mapper.Map<TEntity>(model);
            await _repository.AddAsync(entity);
        }

        public virtual async Task UpdateAsync(int id, TUpdateModel model)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new ArgumentNullException($"Güncellencek {typeof(TEntity).Name} Bulunamadı");
            }
            _mapper.Map(model, entity);
            await _repository.UpdateAsync(entity);
        }

        public virtual async Task DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"Silinecek {typeof(TEntity).Name} Bulunamadı");
            }
            await _repository.DeleteAsync(entity);
        }


    }
}
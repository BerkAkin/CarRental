using AutoMapper;
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
                throw new InvalidOperationException("Veriler Bulunamadı");
            }
            return _mapper.Map<List<TViewModel>>(entities);
        }

        public virtual async Task<TViewIdModel> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new InvalidOperationException("Veri Bulunamadı");
            }
            return _mapper.Map<TViewIdModel>(entity);
        }

        public virtual async Task AddAsync(TAddModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("Veri Boş Olamaz");
            }

            var entity = _mapper.Map<TEntity>(model);
            await _repository.AddAsync(entity);
        }

        public virtual async Task UpdateAsync(int id, TUpdateModel model)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new ArgumentNullException($"Güncellencek Veri Bulunamadı");
            }
            _mapper.Map(model, entity);
            await _repository.UpdateAsync(entity);
        }

        public virtual async Task DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException("Silinecek Veri Bulunamadı");
            }
            await _repository.DeleteAsync(entity);
        }


    }
}
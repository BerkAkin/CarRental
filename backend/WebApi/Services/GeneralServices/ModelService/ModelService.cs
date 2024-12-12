using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.DTOs.Models;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.ModelRepository;

namespace WebApi.Services.GeneralServices.ModelService
{
    public class ModelService : BaseService<Model, ModelAddModel, ModelUpdateModel, ModelViewModel, ModelViewIdModel, ModelRepository>
    {

        public ModelService(ModelRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }

        public async Task<(IEnumerable<ModelViewModel> Models, int TotalRecords)> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var (data, totalRecords) = await _repository.GetAllPaginatedAsync(pageNumber, pageSize, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException("Veriler Bulunamadı");
            }
            var DTOData = _mapper.Map<List<ModelViewModel>>(data);
            return (DTOData, totalRecords);
        }

        public override async Task<ModelViewIdModel> GetByIdAsync(int id)
        {
            var data = await _repository.GetByIdAsync(id, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException("Veri Bulunamadı");
            }
            return _mapper.Map<ModelViewIdModel>(data);
        }

        public async Task<(IEnumerable<ModelSummaryViewModel> Models, int TotalRecords)> GetPaginatedSummaryModels(int pageNumber, int pageSize)
        {
            var (data, totalRecords) = await _repository.GetAllSummaryPaginatedAsync(pageNumber, pageSize, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException("Veriler Bulunamadı");
            }
            var DTOData = _mapper.Map<List<ModelSummaryViewModel>>(data);
            return (DTOData, totalRecords);
        }


    }
}
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


        public override async Task<List<ModelViewModel>> GetAllAsync()
        {
            var data = await _repository.GetAllAsync(query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new InvalidOperationException("Veriler Bulunamadı");
            }
            return _mapper.Map<List<ModelViewModel>>(data);
        }
    }
}
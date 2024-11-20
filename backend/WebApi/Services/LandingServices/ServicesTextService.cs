using AutoMapper;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.LandingServices
{
    public class ServicesTextService
    {
        private readonly IRepository<LandingServiceText> _repository;
        private readonly IMapper _mapper;
        public ServicesTextService(IRepository<LandingServiceText> repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<List<LandingServiceViewModel>> GetAllAsync()
        {
            var landingServiceTexts = await _repository.GetAllAsync();
            if (landingServiceTexts is null)
            {
                throw new InvalidOperationException("Servis Yazıları Bulunamadı");
            }
            var landingServiceDTO = _mapper.Map<List<LandingServiceViewModel>>(landingServiceTexts);
            return landingServiceDTO;
        }

        public async Task<LandingServiceViewIdModel> GetByIdAsync(int id)
        {
            var landingServiceText = await _repository.GetByIdAsync(id);
            if (landingServiceText is null)
            {
                throw new InvalidOperationException("Servis Yazısı Bulunamadı");
            }
            var landingServiceTextDTO = _mapper.Map<LandingServiceViewIdModel>(landingServiceText);
            return landingServiceTextDTO;
        }



        public async Task UpdateAsync(int id, LandingServiceUpdateModel model)
        {
            var landingServiceText = await _repository.GetByIdAsync(id);
            if (landingServiceText is null)
            {
                throw new ArgumentNullException("Güncellenecek Servis Yazısı Bulunamadı");
            }
            _mapper.Map(model, landingServiceText);
            await _repository.UpdateAsync(landingServiceText);
        }



        public async Task AddAsync(LandingServiceAddModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException("Eklencek Veri Boş Olamaz");
            }
            var entity = _mapper.Map<LandingServiceText>(model);
            await _repository.AddAsync(entity);
        }


        public async Task DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity is null)
            {
                throw new KeyNotFoundException("Silinecek Servis Yazısı Bulunamadı");

            }
            await _repository.DeleteAsync(entity);
        }
    }
}
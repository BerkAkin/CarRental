using AutoMapper;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.LandingServices
{
    public class MainTextService
    {
        private readonly IRepository<LandingMainText> _repository;
        private readonly IMapper _mapper;

        public MainTextService(IRepository<LandingMainText> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }


        public async Task<List<LandingMainViewModel>> GetAllAsync()
        {
            var landingMainTexts = await _repository.GetAllAsync();
            var landingMainTextDtos = _mapper.Map<List<LandingMainViewModel>>(landingMainTexts);
            return landingMainTextDtos;
        }

        public async Task<LandingMainViewIdModel> GetByIdAsync(int id)
        {
            var landingMainText = await _repository.GetByIdAsync(id);
            if (landingMainText == null) throw new Exception("LandingMainText bulunamadı");
            return _mapper.Map<LandingMainViewIdModel>(landingMainText);
        }

        public async Task UpdateTextAsync(int id, LandingMainUpdateModel model)
        {
            var landingMainText = await _repository.GetByIdAsync(id);
            if (landingMainText is null)
            {
                throw new Exception("Güncellenecek Bilgi Metni Bulunamadı");
            }
            _mapper.Map(model, landingMainText);

            await _repository.UpdateAsync(landingMainText);
        }


    }
}
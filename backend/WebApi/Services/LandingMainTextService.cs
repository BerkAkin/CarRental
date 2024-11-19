using AutoMapper;
using WebApi.DTOs;
using WebApi.Entities;

namespace WebApi.Repository
{
    public class LandingMainTextService
    {
        private readonly IRepository<LandingMainText> _repository;
        private readonly IMapper _mapper;

        public LandingMainTextService(IRepository<LandingMainText> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }


        public async Task<List<LandingMainTextViewModel>> GetAllAsync()
        {
            var landingMainTexts = await _repository.GetAllAsync();
            var landingMainTextDtos = _mapper.Map<List<LandingMainTextViewModel>>(landingMainTexts);
            return landingMainTextDtos;
        }

        public async Task<LandingMainTextIdViewModel> GetByIdAsync(int id)
        {
            var landingMainText = await _repository.GetByIdAsync(id);
            if (landingMainText == null) throw new Exception("LandingMainText bulunamadı");
            return _mapper.Map<LandingMainTextIdViewModel>(landingMainText);
        }


    }
}
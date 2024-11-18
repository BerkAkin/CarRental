using AutoMapper;
using FluentValidation;
using WebApi.DTOs;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Repository
{
    public class LandingMainTextService : IService<LandingMainText>
    {
        private readonly IRepository<LandingMainText> _repository;
        private readonly IMapper _mapper;

        public LandingMainTextService(IRepository<LandingMainText> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LandingMainText>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        /*         public async Task<IEnumerable<LandingMainTextViewModel>> GetAllAsync()
                {
                    var landingPageMainTexts = await _repository.GetAllAsync();
                    var result = _mapper.Map<IEnumerable<LandingMainTextViewModel>>(landingPageMainTexts);
                    return result;
                } */

    }
}
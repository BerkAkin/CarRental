using AutoMapper;
using FluentValidation;
using WebApi.DTOs;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Repository
{
    public class LandingMainTextService : IService<LandingMainTextViewModel>
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


    }
}
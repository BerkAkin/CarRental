using AutoMapper;
using WebApi.DTOs;
using WebApi.Entities;

namespace WebApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LandingMainText, LandingMainTextViewModel>();
        }
    }
}
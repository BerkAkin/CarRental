using AutoMapper;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Entities;

namespace WebApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LandingMainText, LandingMainTextViewModel>();
            CreateMap<LandingMainText, LandingMainTextIdViewModel>();
        }
    }
}
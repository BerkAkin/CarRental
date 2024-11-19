using AutoMapper;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.Entities;

namespace WebApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LandingMainText, LandingMainTextViewModel>();
            CreateMap<LandingMainText, LandingMainTextIdViewModel>();
            CreateMap<LandingMainTextUpdateModel, LandingMainText>();

            CreateMap<LandingReasonText, LandingReasonViewModel>();
            CreateMap<LandingReasonText, LandingReasonViewIdModel>();
            CreateMap<LandingReasonUpdateModel, LandingReasonText>();
            CreateMap<LandingReasonAddModel, LandingReasonText>();
        }
    }
}
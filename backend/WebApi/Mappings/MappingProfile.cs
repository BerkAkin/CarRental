using AutoMapper;
using WebApi.DTOs.FAQPage;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.DTOs.User;
using WebApi.Entities;

namespace WebApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LandingMainText, LandingMainViewModel>();
            CreateMap<LandingMainText, LandingMainViewIdModel>();
            CreateMap<LandingMainUpdateModel, LandingMainText>();

            CreateMap<LandingReasonText, LandingReasonViewModel>();
            CreateMap<LandingReasonText, LandingReasonViewIdModel>();
            CreateMap<LandingReasonUpdateModel, LandingReasonText>();
            CreateMap<LandingReasonAddModel, LandingReasonText>();

            CreateMap<LandingServiceText, LandingServiceViewModel>();
            CreateMap<LandingServiceText, LandingServiceViewIdModel>();
            CreateMap<LandingServiceUpdateModel, LandingServiceText>();
            CreateMap<LandingServiceAddModel, LandingServiceText>();

            CreateMap<FAQText, FAQViewModel>();
            CreateMap<FAQText, FAQViewIdModel>();
            CreateMap<FAQUpdateModel, FAQText>();
            CreateMap<FAQAddModel, FAQText>();

            CreateMap<User, UserViewModel>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name));
            CreateMap<User, UserViewIdModel>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name)); ;
            CreateMap<UserUpdateModel, User>();
            CreateMap<UserAddModel, User>();
        }
    }
}
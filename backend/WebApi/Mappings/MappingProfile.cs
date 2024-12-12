using AutoMapper;
using WebApi.DTOs.Auth;
using WebApi.DTOs.Comment;
using WebApi.DTOs.FAQPage;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.DTOs.Models;
using WebApi.DTOs.Token;
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

            CreateMap<User, AdminUserViewModel>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name));
            CreateMap<User, AdminUserViewIdModel>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name)); ;
            CreateMap<AdminUserUpdateModel, User>();


            CreateMap<UserComment, CommentViewModel>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Name + " " + src.User.Surname))
            .ForMember(dest => dest.UserType, opt => opt.MapFrom(src => src.User.Role.Name));
            CreateMap<UserComment, CommentViewIdModel>();
            CreateMap<CommentAddModel, UserComment>();
            CreateMap<CommentUpdateModel, UserComment>();


            CreateMap<RegisterModel, User>().ForMember(dest => dest.PasswordHashed, opt => opt.MapFrom(src => src.Password))
            .ForMember(dest => dest.RefreshToken, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshTokenExpiryTime, opt => opt.Ignore());

            CreateMap<User, UserViewIdModel>();
            CreateMap<UserUpdateModel, User>();


            CreateMap<Model, ModelViewModel>().ForMember(dest => dest.CarType, opt => opt.MapFrom(src => src.CarType))
            .ForMember(dest => dest.FuelType, opt => opt.MapFrom(src => src.FuelType))
            .ForMember(dest => dest.GearType, opt => opt.MapFrom(src => src.GearType));

            CreateMap<Model, ModelViewIdModel>().ForMember(dest => dest.CarType, opt => opt.MapFrom(src => src.CarType))
            .ForMember(dest => dest.FuelType, opt => opt.MapFrom(src => src.FuelType))
            .ForMember(dest => dest.GearType, opt => opt.MapFrom(src => src.GearType));

            CreateMap<Model, ModelSummaryViewModel>().ForMember(dest => dest.CarType, opt => opt.MapFrom(src => src.CarType))
            .ForMember(dest => dest.GearType, opt => opt.MapFrom(src => src.GearType));

            CreateMap<ModelAddModel, Model>();
            CreateMap<ModelUpdateModel, Model>();

        }
    }
}
using carRental.API.Models.DTO.image;
using AutoMapper;
using carRental.API.Models.Domain;
using carRental.API.Models.DTO.category;
using carRental.API.Models.DTO.car;
using carRental.API.Models.DTO.comment;
using carRental.API.Models.DTO.faq;
using carRental.API.Models.DTO.blog;
using carRental.API.Models.DTO.auth;

namespace carRental.API.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<AddCategoryDTO, Category>()
                .ForMember(dest => dest.CateVisit, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => false));
            CreateMap<UpdateCategoryDTO, Category>().ReverseMap();
           
            CreateMap<Car, CarDTO>().ReverseMap();
            CreateMap<AddCarDTO, Car>()
                .ForMember(dest => dest.CarVisit, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => false));
            CreateMap<UpdateCarDTO, Car>().ReverseMap();

            CreateMap<Image, ImageDTO>().ReverseMap();
            CreateMap<AddImageDTO, Image>()
                .ForMember(dest => dest.FileExtension, opt => opt.MapFrom(src => Path.GetExtension(src.File.FileName)))
                .ForMember(dest => dest.FileSize, opt => opt.MapFrom(src => src.File.Length))
                .ForMember(dest => dest.FilePath, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Comment, CommentDTO>().ReverseMap();
            CreateMap<AddCommentDTO, Comment>().ReverseMap();
            CreateMap<UpdateCommentDTO, Comment>().ReverseMap();

            CreateMap<FaQ, FaQDTO>().ReverseMap();
            CreateMap<AddFaQDTO, FaQ>().ReverseMap();
            CreateMap<UpdateFaQDTO, FaQ>().ReverseMap();

            CreateMap<Blog, BlogDTO>().ReverseMap();
            CreateMap<AddBlogDTO, Blog>().ReverseMap();
            CreateMap<UpdateBlogDTO, Blog>().ReverseMap();
        }
    }
}

using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.LandingServices
{
    public class ReasonTextService : BaseService<LandingReasonText, LandingReasonAddModel, LandingReasonUpdateModel, LandingReasonViewModel, LandingMainViewIdModel>
    {

        public ReasonTextService(IRepository<LandingReasonText> repository, IMapper mapper) : base(repository, mapper)
        {
        }


    }
}
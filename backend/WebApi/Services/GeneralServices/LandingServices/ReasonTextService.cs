using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;
using WebApi.Repository;

namespace WebApi.Services.GeneralServices.LandingServices
{
    public class ReasonTextService : BaseService<LandingReasonText, LandingReasonAddModel, LandingReasonUpdateModel, LandingReasonViewModel, LandingMainViewIdModel, ReasonTextRepository>
    {

        public ReasonTextService(ReasonTextRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }


    }
}
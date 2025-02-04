using FluentValidation;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.DTOs.LandingPage.ServiceTexts;

namespace WebApi.Validators.LandingPage
{
    public class LandingMainValidator : AbstractValidator<LandingMainUpdateModel>
    {
        public LandingMainValidator()
        {
            RuleFor(x => x.Text).MaximumLength(500).WithMessage("Ana metin maks 500 karakter");
        }
    }

    public class LandingServiceValidator : AbstractValidator<LandingServiceUpdateModel>
    {
        public LandingServiceValidator()
        {
            RuleFor(x => x.Title).MaximumLength(35).WithMessage("Servis başlığı maks 35 karakter");
            RuleFor(x => x.Content).MaximumLength(255).WithMessage("Servis içeriği maks 255 karakter");
        }
    }

    public class LandingReasonValidator : AbstractValidator<LandingReasonUpdateModel>
    {
        public LandingReasonValidator()
        {
            RuleFor(x => x.Title).MaximumLength(35).WithMessage("Sebep başlığı maks 35 karakter");
            RuleFor(x => x.Content).MaximumLength(255).WithMessage("Sebep içeriği maks 255 karakter");
        }
    }

}
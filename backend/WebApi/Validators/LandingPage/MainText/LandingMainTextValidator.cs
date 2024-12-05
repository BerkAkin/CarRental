using FluentValidation;
using WebApi.DTOs.LandingPage.MainText;

namespace WebApi.Validators.LandingPage.MainText
{
    public class LandingMainTextValidator : AbstractValidator<LandingMainViewModel>
    {
        public LandingMainTextValidator()
        {
            RuleFor(x => x.Text).NotEmpty().NotNull().MinimumLength(10);
        }
    }
}
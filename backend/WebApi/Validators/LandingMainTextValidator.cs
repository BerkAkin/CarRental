using FluentValidation;
using WebApi.DTOs.LandingPage.MainText;

namespace WebApi.Validators
{
    public class LandingMainTextValidator : AbstractValidator<LandingMainTextViewModel>
    {
        public LandingMainTextValidator()
        {
            RuleFor(x => x.Text).NotEmpty().NotNull().MinimumLength(10);
        }
    }
}
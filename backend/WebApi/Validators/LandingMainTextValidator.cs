using FluentValidation;
using WebApi.DTOs;

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
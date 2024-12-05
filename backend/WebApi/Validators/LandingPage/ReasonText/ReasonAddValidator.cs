using FluentValidation;
using WebApi.DTOs.LandingPage.ReasonTexts;

namespace WebApi.Validators.LandingPage.ReasonText
{
    public class ReasonAddValidator : AbstractValidator<LandingReasonAddModel>
    {
        public ReasonAddValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Başlık Boş Olamaz").MinimumLength(10).WithMessage("Başlık en az 10 karakter olmalıdır.");
            RuleFor(x => x.Content).NotEmpty().WithMessage("İçerik Boş Olmaz").MinimumLength(10).WithMessage("İçerik en az 10 karakter olmalıdır.");
        }
    }
}
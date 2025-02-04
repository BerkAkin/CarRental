using FluentValidation;
using WebApi.DTOs.Auth;

namespace WebApi.Validators.Auth
{
    public class LoginValidator : AbstractValidator<LoginModel>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotNull().WithMessage("Geçerli bir e-posta girilmelidir").NotEmpty().WithMessage("Geçerli bir e-posta girilmelidir")
            .Matches(@"^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|mail\.com)$").WithMessage("Yalnızca Gmail veya Outlook kullanılabilir.");
            RuleFor(x => x.Password).NotNull().WithMessage("Parola boş olamaz").NotEmpty().WithMessage("Parola boş olamaz").MinimumLength(8).WithMessage("Parola min 8 karakter");
        }
    }
}
using FluentValidation;
using WebApi.DTOs.Auth;

namespace WebApi.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterModel>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email boş olamaz").NotNull().WithMessage("Email boş olamaz")
            .Matches(@"^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$").WithMessage("Yalnızca Gmail veya Outlook kullanılabilir.");

            RuleFor(x => x.Name).NotEmpty().WithMessage("İsim boş olamaz").NotNull().WithMessage("İsim boş olamaz").MaximumLength(25).WithMessage("İsim maks 25 karakter");
            RuleFor(x => x.Surname).NotEmpty().WithMessage("Soyisim boş olamaz").NotNull().WithMessage("Soyisim boş olamaz").MaximumLength(25).WithMessage("Soyisim maks 25 karakter");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Parola boş olamaz").NotNull().WithMessage("Parola boş olamaz").MinimumLength(8).WithMessage("Parola min 8 karakter");

            RuleFor(x => x.PhoneNum).NotEmpty().WithMessage("Telefon numarası boş olamaz").NotNull().WithMessage("Telefon numarası boş olamaz")
            .MinimumLength(11).WithMessage("Telefon no min 11 karakter").MaximumLength(13).WithMessage("Telefon no maks 13 karakter")
            .Matches(@"^\d+$").WithMessage("Telefon numarası sadece rakamlardan oluşmalıdır."); ;

        }
    }
}
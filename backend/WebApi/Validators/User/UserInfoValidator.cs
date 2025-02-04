using FluentValidation;
using WebApi.DTOs.User;

namespace WebApi.Validators.User
{
    public class UserInfoValidator : AbstractValidator<UserUpdateModel>
    {
        public UserInfoValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email boş olamaz").NotNull().WithMessage("Email boş olamaz")
            .Matches(@"^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|mail\.com)$").WithMessage("Yalnızca Gmail veya Outlook kullanılabilir.");

            RuleFor(x => x.PhoneNum).NotEmpty().WithMessage("Telefon numarası boş olamaz").NotNull().WithMessage("Telefon numarası boş olamaz")
            .MinimumLength(11).WithMessage("Telefon no min 11 karakter").MaximumLength(13).WithMessage("Telefon no maks 13 karakter")
            .Matches(@"^\d+$").WithMessage("Telefon numarası sadece rakamlardan oluşmalıdır."); ;

        }
    }
}
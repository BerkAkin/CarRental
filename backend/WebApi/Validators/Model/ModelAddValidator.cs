using FluentValidation;
using WebApi.DTOs.Models;

namespace WebApi.Validators.Model
{
    public class ModelAddValidator : AbstractValidator<ModelAddModel>
    {
        public ModelAddValidator()
        {
            RuleFor(x => x.BrandName).NotEmpty().WithMessage("Marka boş olamaz").NotNull().WithMessage("Marka boş olamaz").MaximumLength(40).WithMessage("Marka maks 40 karakter");
            RuleFor(x => x.ModelName).NotEmpty().WithMessage("Model boş olamaz").NotNull().WithMessage("Model boş olamaz").MaximumLength(50).WithMessage("Model maks 50 karakter");
            RuleFor(x => x.FuelTypeId).NotEmpty().WithMessage("Yakıt türü boş olamaz").NotNull().WithMessage("Yakıt türü boş olamaz").LessThan(21);
            RuleFor(x => x.GearTypeId).NotEmpty().WithMessage("Şanzıman türü boş olamaz").NotNull().WithMessage("Şanzıman türü boş olamaz").LessThan(21);
            RuleFor(x => x.CarTypeId).NotEmpty().WithMessage("Araç türü boş olamaz").NotNull().WithMessage("Araç türü boş olamaz").LessThan(21);
            RuleFor(x => x.Description).NotEmpty().WithMessage("Açıklama boş olamaz").NotNull().WithMessage("Açıklama boş olamaz").MaximumLength(255).WithMessage("Açıklama maks 255 karakter");
            RuleFor(x => x.PersonCount).NotEmpty().WithMessage("Kişi sayısı boş olamaz").NotNull().WithMessage("Kişi sayısı boş olamaz").LessThan(11).WithMessage("Kişi sayısı maks 10");
            RuleFor(x => x.LuggageCount).NotEmpty().WithMessage("Bagaj sayısı boş olamaz").NotNull().WithMessage("Bagaj sayısı boş olamaz").LessThan(16).WithMessage("Bagaj sayısı maks 15");
            RuleFor(x => x.DoorCount).NotEmpty().WithMessage("Kapı sayısı boş olamaz").NotNull().WithMessage("Kapı sayısı boş olamaz").LessThan(7).WithMessage("Kapı sayısı maks 6");
            RuleFor(x => x.Price).NotEmpty().WithMessage("Fiyat boş olamaz").NotNull().WithMessage("Fiyat boş olamaz");
        }
    }
}
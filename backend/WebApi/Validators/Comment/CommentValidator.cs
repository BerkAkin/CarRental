using FluentValidation;
using WebApi.DTOs.Comment;

namespace WebApi.Validators.Comment
{
    public class CommentValidator : AbstractValidator<CommentUpdateModel>
    {
        public CommentValidator()
        {
            RuleFor(x => x.Content).MaximumLength(500).WithMessage("Yorum maks 500 karakter");
        }
    }
}
using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.DTO.category
{
    public class AddCategoryDTO
    {
        public Guid ImageId { get; set; }

        [MaxLength(30, ErrorMessage = "Name can be a maximum of 30 characters.")]
        public required string Name { get; set; }

        [MaxLength(30, ErrorMessage = "Slug can be a maximum of 30 characters.")]
        [RegularExpression(@"^[a-z0-9]+(?:-[a-z0-9]+)*$", ErrorMessage = "Slug must be URL-friendly.")]
        public required string Slug { get; set; }

        [MaxLength(500, ErrorMessage = "Description can be a maximum of 500 characters.")]
        public required string Description { get; set; }

        public bool Popular { get; set; } = false;

        [MaxLength(60, ErrorMessage = "Meta Title can be a maximum of 60 characters.")]
        public required string MetaTitle { get; set; }

        [MaxLength(160, ErrorMessage = "Meta Descriptipn can be a maximum of 60 characters.")]
        public required string MetaDescription { get; set; }

        [MaxLength(100, ErrorMessage = "Meta Keyword can be a maximum of 60 characters.")]
        public required string MetaKeyword { get; set; }
    }
}

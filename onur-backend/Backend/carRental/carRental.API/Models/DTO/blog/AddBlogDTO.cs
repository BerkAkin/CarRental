using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.DTO.blog
{
    public class AddBlogDTO
    {
        public Guid ImageId { get; set; }

        public required string BlogCategory { get; set; }

        [MaxLength(30, ErrorMessage = "Slug can be a maximum of 30 characters.")]
        [RegularExpression(@"^[a-z0-9]+(?:-[a-z0-9]+)*$", ErrorMessage = "Slug must be URL-friendly.")]
        public required string Slug { get; set; }

        public required string Question { get; set; }

        public required string Answer { get; set; }
    }
}

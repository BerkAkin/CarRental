using carRental.API.Models.DTO.image;

namespace carRental.API.Models.DTO.blog
{
    public class BlogDTO
    {
        public Guid Id { get; set; }
        public required string BlogCategory { get; set; }
        public required string Slug { get; set; }
        public required string Question { get; set; }
        public required string Answer { get; set; }

        public required ImageDTO Image { get; set; }
    }
}

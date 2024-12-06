using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.DTO.comment
{
    public class UpdateCommentDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        [MaxLength(1, ErrorMessage = "Name can be a maximum of 1 characters.")]
        public required string StarRate { get; set; }
        public required string UserTitle { get; set; }
    }
}

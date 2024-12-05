using System.ComponentModel.DataAnnotations.Schema;

namespace carRental.API.Models.DTO.image
{
    public class ImageDTO
    {
        public Guid Id { get; set; }
        [NotMapped]
        public required IFormFile File { get; set; }
        public required string FileName { get; set; }
        public required string FileExtension { get; set; }
        public long FileSize { get; set; }
        public string? FilePath { get; set; }
        public string? FileDescription { get; set; }
    }
}

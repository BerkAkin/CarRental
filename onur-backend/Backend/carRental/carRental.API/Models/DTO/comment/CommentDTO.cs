namespace carRental.API.Models.DTO.comment
{
    public class CommentDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string StarRate { get; set; }
        public required string UserTitle { get; set; }
    }
}

namespace carRental.API.Models.Domain
{
    public class Comment
    { 
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string StarRate { get; set; }
        public required string UserTitle { get; set; }
    }
}

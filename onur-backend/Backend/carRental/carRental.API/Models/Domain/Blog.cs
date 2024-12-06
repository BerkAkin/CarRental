namespace carRental.API.Models.Domain
{
    public class Blog
    {
        public Guid Id { get; set; }
        public Guid ImageId { get; set; }
        public required string BlogCategory { get; set; }
        public required string Slug { get; set; }
        public required string Question { get; set; }
        public required string Answer { get; set; }

        public required Image Image { get; set; }
    }
}

namespace carRental.API.Models.Domain
{
    public class FaQ
    {
        public Guid Id { get; set; }
        public required string Question { get; set; }
        public required string Answer { get; set; }
    }
}

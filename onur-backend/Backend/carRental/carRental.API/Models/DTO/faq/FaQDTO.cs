namespace carRental.API.Models.DTO.faq
{
    public class FaQDTO
    {
        public Guid Id { get; set; }
        public required string Question { get; set; }
        public required string Answer { get; set; }
    }
}

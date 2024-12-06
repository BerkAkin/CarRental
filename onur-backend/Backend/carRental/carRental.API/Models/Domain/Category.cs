namespace carRental.API.Models.Domain
{
    public class Category
    {
        public Guid Id { get; set; }  
        public Guid ImageId { get; set; }
        public int CateVisit { get; set; } = 0;
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public required string Description { get; set; }
        public bool Status { get; set; } = false; // 0 = not sellable 1 = sellable (passive deletion)
        public bool Popular { get; set; } = false; // 0 = not popular 1 = popular
        public required string MetaTitle { get; set; }
        public required string MetaDescription { get; set; }
        public required string MetaKeyword { get; set; }

        public required Image Image { get; set; }
    }
}

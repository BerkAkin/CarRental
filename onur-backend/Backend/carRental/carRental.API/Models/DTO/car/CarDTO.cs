using carRental.API.Models.Domain;
using carRental.API.Models.DTO.category;
using carRental.API.Models.DTO.image;

namespace carRental.API.Models.DTO.car
{
    public class CarDTO
    {
        public Guid Id { get; set; }
        public int CarVisit { get; set; } = 0;
        public required string Brand { get; set; }
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public required string Class { get; set; }
        public required string Fuel { get; set; }
        public required string Shifter { get; set; }
        public required string FamilyPrice { get; set; }
        public required string SeatQty { get; set; }
        public required string SellingPrice { get; set; }
        public required string Qty { get; set; }
        public bool Status { get; set; } = false;
        public bool Trending { get; set; } = false;
        public required string MetaTitle { get; set; }
        public required string MetaDescription { get; set; }
        public required string MetaKeyword { get; set; }

        public required CategoryDTO Category { get; set; }
        public required ImageDTO Image { get; set; }
    }
}

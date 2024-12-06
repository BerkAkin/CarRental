using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.Domain
{
    public class Car
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public Guid ImageId { get; set; }
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

        public required Category Category { get; set; }
        public required Image Image { get; set; }
    }
}

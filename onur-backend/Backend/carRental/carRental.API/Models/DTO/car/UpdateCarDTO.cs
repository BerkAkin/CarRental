using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.DTO.car
{
    public class UpdateCarDTO
    {
        public Guid CategoryId { get; set; }
        public Guid ImageId { get; set; }
        public int CarVisit { get; set; } = 0;

        [MaxLength(50, ErrorMessage = "Brand can be a maximum of 50 characters.")]
        public required string Brand { get; set; }

        [MaxLength(50, ErrorMessage = "Name can be a maximum of 50 characters.")]
        public required string Name { get; set; }

        [MaxLength(50, ErrorMessage = "Slug can be a maximum of 30 characters.")]
        [RegularExpression(@"^[a-z0-9]+(?:-[a-z0-9]+)*$", ErrorMessage = "Slug must be URL-friendly.")]
        public required string Slug { get; set; }

        [MaxLength(30, ErrorMessage = "Class can be a maximum of 30 characters.")]
        public required string Class { get; set; }

        [MaxLength(10, ErrorMessage = "Fuel type can be a maximum of 10 characters.")]
        public required string Fuel { get; set; } // dizel, benzin, elektrik, LPG

        [MaxLength(10, ErrorMessage = "Shifter type can be a maximum of 10 characters.")]
        public required string Shifter { get; set; } // otomatik, manuel

        [MaxLength(10, ErrorMessage = "Family price can be a maximum of 10 characters.")]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Family price must be a valid number.")]
        public required string FamilyPrice { get; set; }

        [MaxLength(2, ErrorMessage = "Family price can be a maximum of 2 characters.")] // 0 - 10
        [RegularExpression(@"^\d+$", ErrorMessage = "Seat quantity must be a valid integer.")]
        public required string SeatQty { get; set; }

        [MaxLength(10, ErrorMessage = "Selling price can be a maximum of 10 characters.")]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Selling price must be a valid number.")]
        public required string SellingPrice { get; set; }

        [MaxLength(3, ErrorMessage = "Family price can be a maximum of 3 characters.")] // 0 - 100
        [RegularExpression(@"^\d+$", ErrorMessage = "Quantity must be a valid integer.")]
        public required string Qty { get; set; }

        public bool Status { get; set; } = false;

        public bool Trending { get; set; } = false;

        [MaxLength(60, ErrorMessage = "Meta Title can be a maximum of 60 characters.")]
        public required string MetaTitle { get; set; }

        [MaxLength(160, ErrorMessage = "Meta Descriptipn can be a maximum of 60 characters.")]
        public required string MetaDescription { get; set; }

        [MaxLength(100, ErrorMessage = "Meta Keyword can be a maximum of 60 characters.")]
        public required string MetaKeyword { get; set; }
    }
}

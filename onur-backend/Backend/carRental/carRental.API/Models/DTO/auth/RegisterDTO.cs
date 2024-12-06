using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.DTO.auth
{
    public class RegisterDTO
    {
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; }

        [DataType(DataType.Password)]
        public required string Password { get; set; }

        [MaxLength(100)]
        [RegularExpression(@"^[a-zA-ZıİçÇğĞöÖşŞüÜ\s]+$", ErrorMessage = "Full name can only contain letters and spaces.")]
        public required string FullName { get; set; }

        [DataType(DataType.PhoneNumber)]
        public required string PhoneNumber { get; set; }

        [DataType(DataType.Date)]
        public DateTime? BirthDate { get; set; }

        public required string[] roles { get; set; }
    }
}

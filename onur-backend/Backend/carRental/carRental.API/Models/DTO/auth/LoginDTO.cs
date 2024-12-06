using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.DTO.auth
{
    public class LoginDTO
    {
        [DataType(DataType.EmailAddress)]
        public required string UserName { get; set; }
        [DataType(DataType.Password)]
        public required string Password { get; set; }
    }
}

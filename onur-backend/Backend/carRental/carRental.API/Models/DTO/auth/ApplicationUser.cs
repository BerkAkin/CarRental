using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace carRental.API.Models.DTO.auth
{
    public class ApplicationUser : IdentityUser
    {
        [DataType(DataType.Date)]
        public required DateTime? BirthDate { get; set; }
    }
}

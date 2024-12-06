namespace carRental.API.Models.DTO.auth
{
    public class LoginResponseDTO
    {
        public required string JwtToken { get; set; }
        public required string UserId { get; set; }
    }
}

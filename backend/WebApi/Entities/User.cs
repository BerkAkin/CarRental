namespace WebApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public string PasswordHashed { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public bool IsActive { get; set; } = true;
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime LastOnline { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserComment UserComment { get; set; }
        public ICollection<UserFavorite> FavoriteCars { get; set; }

    }
}
namespace WebApi.DTOs.User
{
    public class UserUpdateModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public int RoleId { get; set; }
        public DateTime LastOnline { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

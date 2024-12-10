namespace WebApi.DTOs.User
{
    public class AdminUserUpdateModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public int RoleId { get; set; }
    }
}

using WebApi.Entities;

namespace WebApi.DTOs.User
{
    public class UserAddModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public string Password { get; set; }

    }
}
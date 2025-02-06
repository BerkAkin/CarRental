namespace WebApi.DTOs.Contact
{
    public class ContactViewIdModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Permission { get; set; }
        public string Platform { get; set; }
        public bool IsRead { get; set; }
    }
}
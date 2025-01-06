namespace WebApi.DTOs.AdminDTOs
{
    public class AdminCommentViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int StarCount { get; set; }
        public bool isActive { get; set; }
        public string UserName { get; set; }
        public string UserMail { get; set; }
        public string UserType { get; set; }
    }
}
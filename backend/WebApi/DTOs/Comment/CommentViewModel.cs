namespace WebApi.DTOs.Comment
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int StarCount { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
    }
}
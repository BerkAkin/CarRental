namespace WebApi.DTOs.Comment
{
    public class CommentViewIdModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int StarCount { get; set; }
        public string UserName { get; set; }
    }
}
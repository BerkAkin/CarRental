namespace WebApi.DTOs.Comment
{
    public class CommentUpdateModel
    {

        public string Content { get; set; }
        public int StarCount { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
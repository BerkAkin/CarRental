using WebApi.Entities;

namespace WebApi.DTOs.Comment
{
    public class CommentAddModel
    {

        public string Content { get; set; }
        public int StarCount { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
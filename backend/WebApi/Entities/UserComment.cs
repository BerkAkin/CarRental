using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class UserComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int StarCount { get; set; }
        public bool IsActive { get; set; } = false;
        public User User { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
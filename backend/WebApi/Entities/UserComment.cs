using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class UserComment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Content { get; set; }
        public int StarCount { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}
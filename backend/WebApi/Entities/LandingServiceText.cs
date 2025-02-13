using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class LandingServiceText
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public Icon Icon { get; set; }
        public int IconId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
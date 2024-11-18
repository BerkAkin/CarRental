using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class LandingMainText
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
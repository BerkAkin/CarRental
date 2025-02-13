using WebApi.Entities;

namespace WebApi.DTOs.LandingPage.ServiceTexts
{
    public class LandingServiceViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public Icon Icon { get; set; }
    }
}
using WebApi.DTOs.LandingPage.MainText;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.DTOs.LandingPage.ServiceTexts;

namespace WebApi.DTOs.LandingPage.HomePage
{
    public class HomePageViewModel
    {
        public List<LandingServiceViewModel> Services { get; set; }
        public List<LandingMainViewModel> MainText { get; set; }
        public List<LandingReasonViewModel> Reasons { get; set; }
    }


}
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.LandingPage.HomePage;
using WebApi.Services.GeneralServices.LandingServices;


namespace WebApi.Controllers.CompositControllers
{
    [ApiController]
    [Route("[controller]s")]
    public class HomepageController : ControllerBase
    {

        private readonly MainTextService _mainTextService;
        private readonly ReasonTextService _reasonTextService;
        private readonly ServicesTextService _serviceTextService;


        public HomepageController(MainTextService mainTextService, ReasonTextService reasonTextService, ServicesTextService serviceTextService)
        {
            _mainTextService = mainTextService;
            _reasonTextService = reasonTextService;
            _serviceTextService = serviceTextService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var services = await _serviceTextService.GetAllAsync();
            var mainText = await _mainTextService.GetAllAsync();
            var reasons = await _reasonTextService.GetAllAsync();

            var homePageData = new HomePageViewModel
            {
                Services = services,
                MainText = mainText,
                Reasons = reasons
            };

            return Ok(homePageData);
        }



    }
}

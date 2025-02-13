using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services.GeneralServices.IconService;

namespace WebApi.Controllers.GeneralControllers.IconController
{
    [ApiController]
    [Route("[controller]s")]
    public class IconController : ControllerBase
    {

        private readonly IconService _service;
        public IconController(IconService service)
        {
            _service = service;
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public async Task<IActionResult> GetIconsAsync()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

    }
}
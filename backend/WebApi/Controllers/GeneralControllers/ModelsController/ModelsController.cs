using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Models;
using WebApi.Services.GeneralServices.ModelService;

namespace WebApi.Controllers.GeneralControllers.ModelsController
{
    [ApiController]
    [Route("[controller]s")]
    public class ModelsController : BaseController
    {
        private readonly ModelService _service;
        public ModelsController(ModelService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<ModelViewModel>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

    }
}
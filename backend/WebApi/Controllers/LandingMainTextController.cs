using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class LandingMainTextController : ControllerBase
    {

        public LandingMainTextService _service { get; set; }

        public LandingMainTextController(LandingMainTextService service)
        {
            _service = service;
        }



        [HttpGet]
        public async Task<ActionResult<List<LandingMainTextIdViewModel>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            if (data is not null)
            {
                return Ok(data);
            }
            return NotFound("Bulunamadı");

        }




        [HttpGet("{id}")]
        public async Task<ActionResult<LandingMainTextIdViewModel>> GetById(int id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

    }
}

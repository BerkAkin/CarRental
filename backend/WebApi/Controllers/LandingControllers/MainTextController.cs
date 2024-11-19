using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Services.LandingServices;

namespace WebApi.Controllers.LandingControllers
{
    [ApiController]
    [Route("[controller]s")]
    public class MainTextController : ControllerBase
    {

        public MainTextService _service { get; set; }
        public MainTextController(MainTextService service)
        {
            _service = service;
        }



        [HttpGet]
        public async Task<ActionResult<List<LandingMainTextViewModel>>> GetAll()
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


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateText(int id, [FromBody] LandingMainTextUpdateModel model)
        {
            try
            {
                await _service.UpdateTextAsync(id, model);
                return Ok("Güncelleme Başarılı");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

    }
}

using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Services.LandingServices;

namespace WebApi.Controllers.LandingControllers
{
    [ApiController]
    [Route("[controller]s")]
    public class MainTextController : ControllerBase
    {

        private readonly MainTextService _service;
        public MainTextController(MainTextService service)
        {
            _service = service;
        }



        [HttpGet]
        public async Task<ActionResult<List<LandingMainViewModel>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            if (data is not null)
            {
                return Ok(data);
            }
            return NotFound("Bulunamadı");

        }



        [HttpGet("{id}")]
        public async Task<ActionResult<LandingMainViewIdModel>> GetById(int id)
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
        public async Task<ActionResult> UpdateText(int id, [FromBody] LandingMainUpdateModel model)
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

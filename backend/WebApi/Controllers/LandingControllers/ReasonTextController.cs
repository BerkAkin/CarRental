using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.Services.LandingServices;

namespace WebApi.Controllers.LandingControllers
{
    [ApiController]
    [Route("[controller]s")]
    public class ReasonTextController : ControllerBase
    {
        private readonly ReasonTextService _service;
        public ReasonTextController(ReasonTextService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<ActionResult<List<LandingReasonViewModel>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LandingReasonViewIdModel>> GetById(int id)
        {
            var data = await _service.GetByIdAsync(id);
            return Ok(data);
        }


        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] LandingReasonAddModel model)
        {
            try
            {
                await _service.AddAsync(model);
                return Ok("Ekleme İşlemi başarılı.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu hatası: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] LandingReasonUpdateModel model)
        {
            try
            {
                await _service.UpdateTextAsync(id, model);
                return Ok("Güncelleme İşlemi başarılı.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu hatası: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Silme İşlemi Başarılı");
        }
    }
}
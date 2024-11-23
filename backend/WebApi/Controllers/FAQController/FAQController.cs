using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.FAQPage;
using WebApi.Services.FAQService;

namespace WebApi.Controllers.FAQController
{
    [ApiController]
    [Route("[controller]s")]
    public class FAQController : ControllerBase
    {

        private readonly FAQService _service;
        public FAQController(FAQService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<ActionResult<List<FAQViewModel>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FAQViewIdModel>> GetById(int id)
        {
            var data = await _service.GetByIdAsync(id);
            return Ok(data);
        }


        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] FAQAddModel model)
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
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] FAQUpdateModel model)
        {
            try
            {
                await _service.UpdateAsync(id, model);
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

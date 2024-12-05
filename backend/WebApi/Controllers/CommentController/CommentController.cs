using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Comment;
using WebApi.DTOs.LandingPage.MainText;
using WebApi.Services.CommentService;

namespace WebApi.Controllers.CommentController
{
    [ApiController]
    [Route("[controller]s")]
    public class CommentController : ControllerBase
    {

        private readonly CommentService _service;
        public CommentController(CommentService service)
        {
            _service = service;
        }



        [HttpGet]
        public async Task<ActionResult<List<CommentViewModel>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            if (data is not null)
            {
                return Ok(data);
            }
            return NotFound("Bulunamadı");

        }

        [HttpGet("/Comments/Latest")]
        public async Task<ActionResult<List<CommentViewModel>>> GetAllLatest()
        {
            var data = await _service.GetLatestAsync();
            if (data is not null)
            {
                return Ok(data);
            }
            return NotFound("Bulunamadı");

        }



        [HttpGet("{id}")]
        public async Task<ActionResult<CommentViewIdModel>> GetById(int id)
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
        public async Task<ActionResult> UpdateText(int id, [FromBody] CommentUpdateModel model)
        {
            try
            {
                await _service.UpdateAsync(id, model);
                return Ok("Güncelleme Başarılı");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] CommentAddModel model)
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


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Silme İşlemi Başarılı");
        }

    }
}

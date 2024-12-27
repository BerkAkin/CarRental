using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.AdminDTOs;
using WebApi.DTOs.Comment;
using WebApi.Services.GeneralServices.CommentService;

namespace WebApi.Controllers.GeneralControllers.CommentController
{
    [ApiController]
    [Route("[controller]s")]
    public class CommentController : BaseController
    {

        private readonly CommentService _service;
        public CommentController(CommentService service)
        {
            _service = service;
        }



        [Authorize(Roles = "1")]
        [HttpGet]
        public async Task<ActionResult<List<AdminCommentViewModel>>> GetAll([FromQuery] int pageNumber = 1)
        {
            if (pageNumber < 1)
            {
                return BadRequest("Sayfa numarası 1 veya daha büyük olmalıdır.");
            }

            var (data, totalRecords) = await _service.GetAllPaginatedAsync(pageNumber, 10);
            var totalPages = (int)Math.Ceiling(totalRecords / (double)10);
            var response = new
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = pageNumber,
                Data = data
            };

            if (response is not null)
            {
                return Ok(response);
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



        [HttpPut("/Comments/AcceptComment")]
        public async Task<ActionResult> AcceptComment([FromBody] int id)
        {
            await _service.AcceptComment(id);
            return Ok("Yorum Doğrulandı");
        }

        [Authorize(Roles = "1")]
        [HttpPut("/Comments/RefuseComment")]
        public async Task<ActionResult> RefuseComment([FromBody] int id)
        {
            await _service.RefuseComment(id);
            return Ok("Yorum Kaldırıldı");
        }

        [Authorize(Roles = "1")]
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


        [Authorize(Roles = "2")]
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

        [Authorize(Roles = "1,2")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Silme İşlemi Başarılı");
        }

        [Authorize(Roles = "1,2")]
        [HttpGet("OwnComment")]
        public async Task<ActionResult<CommentViewIdModel>> GetOwnComment()
        {
            var comment = await _service.GetOwnComment(Convert.ToInt32(UserId));
            return Ok(comment);
        }

        [Authorize(Roles = "1,2")]
        [HttpPut("OwnComment")]
        public async Task<ActionResult> UpdateOwnComment([FromBody] CommentUpdateModel model)
        {
            try
            {
                await _service.UpdateOwnComment(Convert.ToInt32(UserId), model);
                return Ok("Güncelleme Başarılı");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

    }
}

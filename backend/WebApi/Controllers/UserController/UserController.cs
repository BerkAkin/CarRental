using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.FAQPage;
using WebApi.DTOs.User;
using WebApi.Services.UserService;

namespace WebApi.Controllers.FAQController
{
    [ApiController]
    [Route("[controller]s")]
    public class UserController : ControllerBase
    {

        private readonly UserService _service;
        public UserController(UserService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<ActionResult<List<UserViewModel>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserViewIdModel>> GetById(int id)
        {
            var data = await _service.GetByIdAsync(id);
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] UserAddModel model)
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
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] UserUpdateModel model)
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

        [HttpPut("{id}/is-active")]
        public async Task<ActionResult> ActivateUser(int id)
        {
            await _service.ActivateUserAsync(id);
            return Ok("Kullanıcı Aktifleştirildi");
        }

    }
}

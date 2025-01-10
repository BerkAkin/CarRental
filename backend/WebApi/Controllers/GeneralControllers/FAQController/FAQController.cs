using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.FAQPage;
using WebApi.Exceptions;
using WebApi.Services.GeneralServices.FAQService;

namespace WebApi.Controllers.GeneralControllers.FAQController
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

        [Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public async Task<ActionResult<FAQViewIdModel>> GetById(int id)
        {

            var data = await _service.GetByIdAsync(id);
            return Ok(data);


        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] FAQAddModel model)
        {

            await _service.AddAsync(model);
            return Ok("Ekleme İşlemi başarılı.");

        }


        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] FAQUpdateModel model)
        {

            await _service.UpdateAsync(id, model);
            return Ok("Güncelleme İşlemi başarılı.");

        }


        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {

            await _service.DeleteAsync(id);
            return Ok("Silme İşlemi Başarılı");


        }

    }
}

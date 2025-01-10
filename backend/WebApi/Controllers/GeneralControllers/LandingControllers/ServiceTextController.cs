using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.LandingPage.ServiceTexts;
using WebApi.Exceptions;
using WebApi.Services.GeneralServices.LandingServices;


namespace WebApi.Controllers.GeneralControllers.LandingControllers
{
    [ApiController]
    [Route("[controller]s")]
    public class ServiceTextController : ControllerBase
    {
        private readonly ServicesTextService _service;
        public ServiceTextController(ServicesTextService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<ActionResult<List<LandingServiceViewModel>>> GetAll()
        {

            var data = await _service.GetAllAsync();
            if (data is not null)
            {
                return Ok(data);
            }
            return NotFound("Veriler Bulunamadı");






        }

        [Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public async Task<ActionResult<LandingServiceViewIdModel>> GetById(int id)
        {

            var data = await _service.GetByIdAsync(id);
            if (data is not null)
            {
                return Ok(data);
            }
            return NotFound("Veri Bulunamadı");

        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] LandingServiceAddModel model)
        {

            await _service.AddAsync(model);
            return Ok("Ekleme İşlemi başarılı.");

        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] LandingServiceUpdateModel model)
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
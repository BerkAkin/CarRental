using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Services.GeneralServices.TypeServices;

namespace WebApi.Controllers.GeneralControllers.TypeControllers
{
    [ApiController]
    [Route("[controller]s")]
    public class FuelController : BaseController
    {

        private readonly FuelService _service;
        public FuelController(FuelService service)
        {
            _service = service;
        }




        [HttpGet]
        public async Task<ActionResult<List<GearType>>> GetAll()
        {
            var data = await _service.GetAllAsync();
            if (data is not null)
            {
                return Ok(data);
            }
            return NotFound("Bulunamadı");

        }


    }
}

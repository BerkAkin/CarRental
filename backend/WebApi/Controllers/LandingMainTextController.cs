using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Services;
using WebApi.DTOs;
using FluentValidation;
using WebApi.Validators;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class LandingMainTextController : ControllerBase
    {
        private readonly IService<LandingMainText> _service;

        public LandingMainTextController(IService<LandingMainText> service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
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

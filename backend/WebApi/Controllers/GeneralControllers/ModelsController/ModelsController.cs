using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.DTOs.Models;
using WebApi.Exceptions;
using WebApi.Services.GeneralServices.ModelService;

namespace WebApi.Controllers.GeneralControllers.ModelsController
{
    [ApiController]
    [Route("[controller]")]
    public class ModelsController : BaseController
    {
        private readonly ModelService _service;
        public ModelsController(ModelService service)
        {
            _service = service;
        }



        [HttpGet]
        public async Task<ActionResult<List<ModelViewModel>>> GetAll([FromQuery] string query = "", [FromQuery] int pageNumber = 1)
        {

            if (pageNumber < 1)
            {
                return BadRequest("Sayfa numarası 1 veya daha büyük olmalıdır.");
            }
            var (data, totalRecords) = await _service.GetAllPaginatedAsync(pageNumber, 8, query);
            var totalPages = (int)Math.Ceiling(totalRecords / (double)8);
            var response = new
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = pageNumber,
                Data = data
            };
            return Ok(response);


        }

        [HttpGet("Summary")]
        public async Task<ActionResult> GetSummaryInfo([FromQuery] int pageNumber = 1)
        {

            if (pageNumber < 1)
            {
                return BadRequest("Sayfa numarası 1 veya daha büyük olmalıdır.");
            }

            var (data, totalRecords) = await _service.GetPaginatedSummaryModels(pageNumber, 8);
            var totalPages = (int)Math.Ceiling(totalRecords / (double)8);

            var response = new
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = pageNumber,
                Data = data
            };

            return Ok(response);


        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<ModelViewIdModel>> GetById(string slug)
        {

            var data = await _service.GetByIdAsync(slug);
            return Ok(data);


        }



        [Authorize(Roles = "1")]
        [HttpPost]
        public async Task<ActionResult> AddAsync(ModelAddModel model)
        {

            await _service.AddAsync(model);
            return Ok("Araç modeli eklendi.");

        }

        [Authorize(Roles = "1")]
        [HttpDelete("{slug}")]
        public async Task<ActionResult> DeleteAsync(string slug)
        {

            await _service.DeleteAsync(slug);
            return Ok("Araç modeli silindi");


        }

        [Authorize(Roles = "1")]
        [HttpPut]
        public async Task<ActionResult> UpdateAsync(ModelUpdateModel model)
        {

            await _service.UpdateAsync(model);
            return Ok("Araç modeli güncellendi");

        }


        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            var data = await _service.UploadImage(file);
            return Ok(new { image = data });
        }





    }
}
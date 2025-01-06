using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.DTOs.Models;
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
        public async Task<ActionResult<List<ModelViewModel>>> GetAll([FromQuery] int pageNumber = 1)
        {
            if (pageNumber < 1)
            {
                return BadRequest("Sayfa numarası 1 veya daha büyük olmalıdır.");
            }
            var (data, totalRecords) = await _service.GetAllPaginatedAsync(pageNumber, 8);
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ModelViewIdModel>> GetById(int id)
        {
            var data = await _service.GetByIdAsync(id);
            return Ok(data);
        }



        [Authorize(Roles = "1")]
        [HttpPost]
        public async Task<ActionResult> AddAsync(ModelAddModel model)
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

        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Silme İşlemi Başarılı");
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(int id, ModelUpdateModel model)
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


    }
}
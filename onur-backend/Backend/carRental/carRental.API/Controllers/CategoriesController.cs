using AutoMapper;
using carRental.API.CustomActionFilter;
using carRental.API.Models.Domain;
using carRental.API.Models.DTO.category;
using carRental.API.Repository.category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace carRental.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;
        private readonly ILogger logger;

        public CategoriesController(ICategoryRepository categoryRepository, IMapper mapper, ILogger<CategoriesController> logger)
        {
            this.mapper = mapper;
            this.categoryRepository = categoryRepository;
            this.logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetAllV1()
        {
            var result = await categoryRepository.GetAllAsync();

            var categoryDTO = mapper.Map<List<CategoryDTO>>(result);

            return Ok(categoryDTO);
        }

        [HttpGet]
        [Route("get-category-by-id/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetByIDV1([FromRoute] Guid Id)
        {
            var result = await categoryRepository.GetByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var categoryDTO = mapper.Map<CategoryDTO>(result);
            return Ok(categoryDTO);
        }

        [HttpPost]
        [Route("save-category")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> CreateV1([FromBody] AddCategoryDTO addCategoryDTO)
        {
            var category = mapper.Map<Category>(addCategoryDTO);

            category = await categoryRepository.CreateAsync(category);

            var categoryDTO = mapper.Map<CategoryDTO>(category);

            return CreatedAtAction(nameof(GetByIDV1), new { id = categoryDTO.Id }, categoryDTO);

        }

        [HttpPut]
        [Route("update-category/{Id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> UpdateV1([FromRoute] Guid Id, [FromBody] UpdateCategoryDTO updateCategoryDTO)
        {
            var category = mapper.Map<Category>(updateCategoryDTO);

            category = await categoryRepository.UpdateAsync(Id, category);

            if (category is null)
            {
                return NotFound();
            }

            var categorDTO = mapper.Map<CategoryDTO>(category);

            return Ok(categorDTO);

        }

        [HttpDelete]
        [Route("delete-category/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteV1([FromRoute] Guid Id)
        {

            var categoryExists = await categoryRepository.DeleteAsync(Id);

            if (categoryExists is null)
            {
                return NotFound();
            }

            var categoryDTO = mapper.Map<CategoryDTO>(categoryExists);

            return Ok(categoryDTO);
        }





        [HttpGet]
        [Route("get-all")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> GetAllV2()
        {
            var result = await categoryRepository.GetAllAsync();

            var categoryDTO = mapper.Map<List<CategoryDTO>>(result);

            return Ok(categoryDTO);
        }

        [HttpGet]
        [Route("get-category-by-id/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> GetByIDV2([FromRoute] Guid Id)
        {
            var result = await categoryRepository.GetByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var categoryDTO = mapper.Map<CategoryDTO>(result);
            return Ok(categoryDTO);
        }

        [HttpPost]
        [Route("save-category")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> CreateV2([FromBody] AddCategoryDTO addCategoryDTO)
        {
            var category = mapper.Map<Category>(addCategoryDTO);

            category = await categoryRepository.CreateAsync(category);

            var categoryDTO = mapper.Map<CategoryDTO>(category);

            return CreatedAtAction(nameof(GetByIDV2), new { id = categoryDTO.Id }, categoryDTO);

        }

        [HttpPut]
        [Route("update-category/{Id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> UpdateV2([FromRoute] Guid Id, [FromBody] UpdateCategoryDTO updateCategoryDTO)
        {
            var category = mapper.Map<Category>(updateCategoryDTO);

            category = await categoryRepository.UpdateAsync(Id, category);

            if (category is null)
            {
                return NotFound();
            }

            var categorDTO = mapper.Map<CategoryDTO>(category);

            return Ok(categorDTO);

        }

        [HttpPut]
        [Route("delete-category/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> DeleteV2([FromRoute] Guid Id, [FromQuery] bool status)
        {

            var categoryExists = await categoryRepository.DeletePassiveAsync(Id, status);

            if (categoryExists is null)
            {
                return NotFound();
            }

            var categoryDTO = mapper.Map<CategoryDTO>(categoryExists);

            return Ok(categoryDTO);
        }
    }
}

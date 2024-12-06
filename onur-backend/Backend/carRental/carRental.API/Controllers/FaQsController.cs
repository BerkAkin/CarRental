using AutoMapper;
using carRental.API.CustomActionFilter;
using carRental.API.Models.Domain;
using carRental.API.Models.DTO.faq;
using carRental.API.Repository.faq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace carRental.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class FaQsController : ControllerBase
    {
        private readonly IFaQRepository faQRepository;
        private readonly IMapper mapper;
        private readonly ILogger logger;

        public FaQsController(IFaQRepository faQRepository, IMapper mapper, ILogger<FaQsController> logger)
        {
            this.faQRepository = faQRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetAllV1()
        {
            var result = await faQRepository.GetAllAsync();

            var faqDTO = mapper.Map<List<FaQDTO>>(result);

            return Ok(faqDTO);
        }

        [HttpGet]
        [Route("get-faq-by-id/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetByIDV1([FromRoute] Guid Id)
        {
            var result = await faQRepository.GetByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var faqDTO = mapper.Map<FaQDTO>(result);
            return Ok(faqDTO);
        }

        [HttpPost]
        [Route("save-faq")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> CreateV1([FromBody] AddFaQDTO addFaQDTO)
        {
            var faq = mapper.Map<FaQ>(addFaQDTO);

            faq = await faQRepository.CreateAsync(faq);

            var faqDTO = mapper.Map<FaQDTO>(faq);

            return CreatedAtAction(nameof(GetByIDV1), new { id = faqDTO.Id }, faqDTO);

        }

        [HttpPut]
        [Route("update-faq/{Id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> UpdateV1([FromRoute] Guid Id, [FromBody] UpdateFaQDTO updateFaQDTO)
        {
            var faq = mapper.Map<FaQ>(updateFaQDTO);

            faq = await faQRepository.UpdateAsync(Id, faq);

            if (faq is null)
            {
                return NotFound();
            }

            var faQDTO = mapper.Map<FaQDTO>(faq);

            return Ok(faQDTO);

        }

        [HttpDelete]
        [Route("delete-faq/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteV1([FromRoute] Guid Id)
        {

            var faqExists = await faQRepository.DeleteAsync(Id);

            if (faqExists is null)
            {
                return NotFound();
            }

            var faQDTO = mapper.Map<FaQDTO>(faqExists);

            return Ok(faQDTO);
        }
    }
}

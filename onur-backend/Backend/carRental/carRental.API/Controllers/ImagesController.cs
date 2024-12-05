using AutoMapper;
using carRental.API.Models.Domain;
using carRental.API.Models.DTO.image;
using carRental.API.Repository.image;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace carRental.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;
        private readonly IMapper mapper;
        private readonly ILogger logger;

        public ImagesController(IImageRepository imageRepository, IMapper mapper, ILogger<ImagesController> logger)
        {
            this.imageRepository = imageRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpPost]
        [Route("save-image")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> CreateV1([FromForm] AddImageDTO addImageDTO)
        {
            logger.LogInformation("Image upload method was invoked");
            ValidateImage(addImageDTO);
            if (ModelState.IsValid)
            {
                var imageDomain = mapper.Map<Image>(addImageDTO);
                await imageRepository.CreateAsync(imageDomain);

                logger.LogInformation($"Image upload method was invoked{JsonSerializer.Serialize(imageDomain)}");
                return Ok(imageDomain);
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("delete-image/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteV1([FromRoute] Guid Id)
        {
            var deletedImage = await imageRepository.DeleteAsync(Id);

            if (deletedImage is null)
            {
                return NotFound();
            }

            return Ok(deletedImage);
        }





        [HttpPost]
        [Route("save-image")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> CreateV2([FromForm] AddImageDTO addImageDTO)
        {
            logger.LogInformation("Image upload method was invoked");
            ValidateImage(addImageDTO);
            if (ModelState.IsValid)
            {
                var imageDomain = mapper.Map<Image>(addImageDTO);
                await imageRepository.CreateAsync(imageDomain);

                logger.LogInformation($"Image upload method was invoked{JsonSerializer.Serialize(imageDomain)}");
                return Ok(imageDomain);
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("delete-image/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> DeleteV2([FromRoute] Guid Id)
        {
            var deletedImage = await imageRepository.DeleteAsync(Id);

            if (deletedImage is null)
            {
                return NotFound();
            }
                                                                      
            return Ok(deletedImage);
        }

        private void ValidateImage(AddImageDTO addImageDTO)
        {
            var allowedExtension = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowedExtension.Contains(Path.GetExtension(addImageDTO.File.FileName)))
            {
                ModelState.AddModelError("file", "unsupported file extension");
            }

            if (addImageDTO.File.Length > 10485760)
            {
                ModelState.AddModelError("file", "File size can't be more then 10MB");
            }
        }
    }
}

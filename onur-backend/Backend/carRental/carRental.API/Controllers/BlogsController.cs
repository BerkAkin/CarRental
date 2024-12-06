using AutoMapper;
using carRental.API.CustomActionFilter;
using carRental.API.Models.Domain;
using carRental.API.Models.DTO.blog;
using carRental.API.Repository.blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace carRental.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogRepository blogRepository;
        private readonly IMapper mapper;
        private readonly ILogger logger;

        public BlogsController(IBlogRepository blogRepository, IMapper mapper, ILogger<BlogsController> logger)
        {
            this.blogRepository = blogRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetAllV1()
        {
            var result = await blogRepository.GetAllAsync();

            var blogDTO = mapper.Map<List<BlogDTO>>(result);

            return Ok(blogDTO);
        }

        [HttpGet]
        [Route("get-blog-by-id/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetByIDV1([FromRoute] Guid Id)
        {
            var result = await blogRepository.GetByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogDTO>(result);
            return Ok(blogDTO);
        }

        [HttpPost]
        [Route("save-blog")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> CreateV1([FromBody] AddBlogDTO addBlogDTO)
        {
            var blog = mapper.Map<Blog>(addBlogDTO);

            blog = await blogRepository.CreateAsync(blog);

            var blogDTO = mapper.Map<BlogDTO>(blog);

            return CreatedAtAction(nameof(GetByIDV1), new { id = blogDTO.Id }, blogDTO);

        }

        [HttpPut]
        [Route("update-blog/{Id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> UpdateV1([FromRoute] Guid Id, [FromBody] UpdateBlogDTO updateBlogDTO)
        {
            var blog = mapper.Map<Blog>(updateBlogDTO);

            blog = await blogRepository.UpdateAsync(Id, blog);

            if (blog is null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogDTO>(blog);

            return Ok(blogDTO);

        }

        [HttpDelete]
        [Route("delete-blog/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteV1([FromRoute] Guid Id)
        {

            var blogExists = await blogRepository.DeleteAsync(Id);

            if (blogExists is null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<BlogDTO>(blogExists);

            return Ok(blogDTO);
        }
    }
}

using AutoMapper;
using carRental.API.CustomActionFilter;
using carRental.API.Models.Domain;
using carRental.API.Models.DTO.comment;
using carRental.API.Repository.comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace carRental.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepository commentRepository;
        private readonly IMapper mapper;
        private readonly ILogger<CommentsController> logger;

        public CommentsController(ICommentRepository commentRepository, IMapper mapper, ILogger<CommentsController> logger)
        {
            this.commentRepository = commentRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetAllV1()
        {
            var result = await commentRepository.GetAllAsync();

            var commentDTO = mapper.Map<List<CommentDTO>>(result);

            return Ok(commentDTO);
        }

        [HttpGet]
        [Route("get-comment-by-id/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetByIDV1([FromRoute] Guid Id)
        {
            var result = await commentRepository.GetByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var commentDTO = mapper.Map<CommentDTO>(result);
            return Ok(commentDTO);
        }

        [HttpPost]
        [Route("save-comment")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> CreateV1([FromBody] AddCommentDTO addCommentDTO)
        {
            var comment = mapper.Map<Comment>(addCommentDTO);

            comment = await commentRepository.CreateAsync(comment);

            var commetnDTO = mapper.Map<CommentDTO>(comment);

            return CreatedAtAction(nameof(GetByIDV1), new { id = commetnDTO.Id }, commetnDTO);

        }

        [HttpPut]
        [Route("update-comment/{Id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> UpdateV1([FromRoute] Guid Id, [FromBody] UpdateCommentDTO updateCommentDTO)
        {
            var comment = mapper.Map<Comment>(updateCommentDTO);

            comment = await commentRepository.UpdateAsync(Id, comment);
            
            if (comment is null)
            {
                return NotFound();
            }

            var commentDTO = mapper.Map<CommentDTO>(comment);

            return Ok(commentDTO);

        }

        [HttpDelete]
        [Route("delete-comment/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteV1([FromRoute] Guid Id)
        {

            var commExists = await commentRepository.DeleteAsync(Id);

            if (commExists is null)
            {
                return NotFound();
            }

            var commentDTO = mapper.Map<CommentDTO>(commExists);

            return Ok(commentDTO);
        }

    }
}

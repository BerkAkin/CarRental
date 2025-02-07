using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Contact;
using WebApi.Services.ContactService;


namespace WebApi.Controllers.ContactController
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ContactService _contactService;
        public ContactController(ContactService service)
        {
            _contactService = service;
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] ContactAddModel model)
        {
            await _contactService.AddAsync(model);
            return Ok("Form gönderildi. Kısa bir süre sonra sizinle iletişime geçilecektir.");
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactViewModel>>> GetAllAsync([FromQuery] int pageNumber = 1)
        {
            if (pageNumber < 1)
            {
                return BadRequest("Sayfa numarası 1 veya daha büyük olmalıdır.");
            }

            var (data, totalRecords) = await _contactService.GetAllPaginatedAsync(pageNumber);
            int totalPages = (int)Math.Ceiling(totalRecords / (double)10);
            var response = new
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = pageNumber,
                Data = data
            };
            return Ok(response);

        }
    }
}
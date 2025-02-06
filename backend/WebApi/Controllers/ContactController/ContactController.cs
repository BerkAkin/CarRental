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
    }
}
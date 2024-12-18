using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Favorites;
using WebApi.Services.GeneralServices.FavoriteService;

namespace WebApi.Controllers.GeneralControllers.FavoriteController
{
    [ApiController]
    [Route("[controller]s")]
    public class FavoriteController : BaseController
    {

        private readonly FavoriteService _service;
        public FavoriteController(FavoriteService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<ActionResult<List<FavoriteViewModel>>> GetAllUserFavoritesAsync()
        {
            var data = await _service.GetAllUserFavoritesAsync(Convert.ToInt32(UserId));
            return Ok(data);
        }



    }
}

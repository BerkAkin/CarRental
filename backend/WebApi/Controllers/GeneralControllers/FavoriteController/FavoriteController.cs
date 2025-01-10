using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTOs.Favorites;
using WebApi.Exceptions;
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

        [Authorize(Roles = "1,2")]
        [HttpGet]
        public async Task<ActionResult<List<FavoriteViewModel>>> GetOwnFavoritesAsync()
        {

            var data = await _service.GetOwnFavoritesAsync(Convert.ToInt32(UserId));
            return Ok(data);



        }

        [Authorize(Roles = "1,2")]
        [HttpPost]
        public async Task<ActionResult> AddFavorites([FromBody] int modelId)
        {
            await _service.AddFavorites(Convert.ToInt32(UserId), modelId);
            return Ok("Favorilere Eklendi");
        }


        [Authorize(Roles = "1,2")]
        [HttpDelete]
        public async Task<ActionResult> DeleteFavorite([FromBody] int modelId)
        {

            await _service.RemoveFavorite(Convert.ToInt32(UserId), modelId);
            return Ok("Favorilerden Kaldırıldı");


        }
    }
}

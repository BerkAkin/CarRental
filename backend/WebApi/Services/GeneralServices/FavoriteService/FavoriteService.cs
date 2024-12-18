using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.DTOs.Favorites;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.FavoriteRepository;

namespace WebApi.Services.GeneralServices.FavoriteService
{
    public class FavoriteService : BaseService<UserFavorite, FavoriteAddModel, object, FavoriteViewModel, ObjectFactory, FavoriteRepository>
    {
        public FavoriteService(FavoriteRepository repository, IMapper mapper) : base(repository, mapper) { }

        public async Task<List<FavoriteViewModel>> GetAllUserFavoritesAsync(int UserId)
        {
            var favoritesList = await _repository.GetAllUserFavoritesAsync(query => query.Include(src => src.Model.CarType).Include(src => src.Model.GearType).Where(src => src.UserId == UserId));
            if (favoritesList is null)
            {
                throw new KeyNotFoundException("Favoriler Bulunamadı");
            }
            return _mapper.Map<List<FavoriteViewModel>>(favoritesList);
        }
    }
}
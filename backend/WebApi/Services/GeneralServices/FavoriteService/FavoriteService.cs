using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.DTOs.Favorites;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.FavoriteRepository;

namespace WebApi.Services.GeneralServices.FavoriteService
{
    public class FavoriteService : BaseService<UserFavorite, object, object, FavoriteViewModel, ObjectFactory, FavoriteRepository>
    {
        public FavoriteService(FavoriteRepository repository, IMapper mapper) : base(repository, mapper) { }

        public async Task<List<FavoriteViewModel>> GetOwnFavoritesAsync(int UserId)
        {
            var favoritesList = await _repository.GetOwnFavoritesAsync(query => query.Include(src => src.Model.CarType).Include(src => src.Model.GearType).Where(src => src.UserId == UserId));
            if (favoritesList is null)
            {
                throw new KeyNotFoundException("Favoriler Bulunamadı");
            }
            return _mapper.Map<List<FavoriteViewModel>>(favoritesList);
        }

        public async Task AddFavorites(int UserId, int modelId)
        {
            var exists = await _repository.CheckFavorite(UserId, modelId);
            if (exists is not null)
            {
                throw new DuplicateNameException("Araç zaten favorilere eklenmiş");
            }

            var userFavorite = new UserFavorite { UserId = UserId, ModelId = modelId };
            await _repository.AddFavorite(userFavorite);

        }

        public async Task RemoveFavorite(int UserId, int modelId)
        {
            var data = await _repository.CheckFavorite(UserId, modelId);
            if (data is null)
            {
                throw new KeyNotFoundException("Favori bulunamadı");
            }
            await _repository.DeleteAsync(data);
        }
    }
}
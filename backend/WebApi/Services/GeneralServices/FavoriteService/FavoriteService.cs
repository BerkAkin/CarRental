using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Common;
using WebApi.DTOs.Favorites;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.GeneralRepositories.FavoriteRepository;

namespace WebApi.Services.GeneralServices.FavoriteService
{
    public class FavoriteService : BaseService<UserFavorite, object, object, FavoriteViewModel, ObjectFactory, FavoriteRepository>
    {
        public FavoriteService(FavoriteRepository repository, IMapper mapper) : base(repository, mapper) { }

        public async Task<List<FavoriteViewModel>> GetOwnFavoritesAsync(int UserId)
        {

            var favoritesList = await _repository.GetOwnFavoritesAsync(query => query.Include(src => src.Model).ThenInclude(src => src.CarType).Include(src => src.Model.GearType).Where(src => src.UserId == UserId));
            if (favoritesList is null)
            {
                throw new KeyNotFoundException(ErrorMessages.FAVORITES_NOT_FOUND);
            }
            return _mapper.Map<List<FavoriteViewModel>>(favoritesList);


        }

        public async Task AddFavorites(int UserId, int modelId)
        {

            var exists = await _repository.CheckFavorite(UserId, modelId);
            if (exists is not null)
            {
                throw new DuplicateNameException(ErrorMessages.FAVORITE_ALREADY_EXISTS);
            }

            try
            {
                var userFavorite = new UserFavorite { UserId = UserId, ModelId = modelId };
                await _repository.AddFavorite(userFavorite);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }

        public async Task RemoveFavorite(int UserId, int modelId)
        {

            var data = await _repository.CheckFavorite(UserId, modelId);
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.FAVORITE_DELETE_FAIL);
            }
            try
            {
                await _repository.DeleteAsync(data);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }

        }



    }
}
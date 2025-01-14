using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Common;
using WebApi.DTOs.AdminDTOs;
using WebApi.DTOs.User;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.UserRepository;

namespace WebApi.Services.UserService
{
    public class UserService : BaseService<User, object, AdminUserUpdateModel, AdminUserViewModel, AdminUserViewIdModel, UserRepository>
    {

        public UserService(UserRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }


        //Admin Kullanıcıları Getirme
        public override async Task<List<AdminUserViewModel>> GetAllAsync()
        {

            var data = await _repository.GetAllAsync(query => query.Include(u => u.Role));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.USERS_NOT_FOUND);
            }
            return _mapper.Map<List<AdminUserViewModel>>(data);



        }

        //Admin Kullanıcıyı Id ile Getirme
        public override async Task<AdminUserViewIdModel> GetByIdAsync(int id)
        {

            var data = await _repository.GetByIdAsync(id, query => query.Include(u => u.Role));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.USER_NOT_FOUND);
            }
            return _mapper.Map<AdminUserViewIdModel>(data);

        }

        //Admin Kullanıcıyı Güncelleme
        public override async Task UpdateAsync(int id, AdminUserUpdateModel model)
        {

            var user = await _repository.GetByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException(ErrorMessages.USER_UPDATE_FAIL);
            }

            try
            {
                user.LastOnline = DateTime.Now;
                _mapper.Map(model, user);
                await _repository.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }

        }

        //Admin Kullanıcıyı Silme
        public override async Task DeleteAsync(int id)
        {

            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException(ErrorMessages.USER_DELETE_FAIL);
            }
            try
            {
                user.IsActive = false;
                await _repository.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }

        }

        //Admin Kullanıcıyı Aktifleştirme
        public async Task ActivateUserAsync(int id)
        {

            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException(ErrorMessages.ACTIVATE_USER_FAIL);
            }

            try
            {
                user.IsActive = true;
                await _repository.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }

        }



        //Kullanıcı Kendi Bilgilerini Görme
        public async Task<UserViewIdModel> GetOwnInfo(int id)
        {

            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException(ErrorMessages.USER_NOT_FOUND);
            }
            return _mapper.Map<UserViewIdModel>(user);



        }

        //Kullanıcı Kendi Bilgilerini Güncelleme
        public async Task UpdateOwnInfo(int id, UserUpdateModel model)
        {

            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException(ErrorMessages.USER_UPDATE_FAIL);
            }
            try
            {
                _mapper.Map(model, user);
                await _repository.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }

        //Kullanıcı Kendi Hesabını Silme


        //Kullanıcının kendi bilgilerini almak fronttaki erişim doğrulama için kullanılacak
        public async Task<UserInfo> GetUserInfoValidation(int id)
        {
            var data = await _repository.getUserInfoValidation(id);
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.NO_LOGGED_IN_USER);
            }

            try
            {
                var dto = _mapper.Map<UserInfo>(data);
                return dto;
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }

        }


        public async Task<bool> checkMe(UserInfo data)
        {
            var result = await _repository.checkMe(data);
            if (result is null)
            {
                return false;
            }
            return true;
        }
    }
}
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.DTOs.User;
using WebApi.Entities;
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
                throw new InvalidOperationException("Veriler Bulunamadı");
            }
            return _mapper.Map<List<AdminUserViewModel>>(data);
        }

        //Admin Kullanıcıyı Id ile Getirme
        public override async Task<AdminUserViewIdModel> GetByIdAsync(int id)
        {
            var data = await _repository.GetByIdAsync(id, query => query.Include(u => u.Role));
            if (data is null)
            {
                throw new InvalidOperationException("Veri Bulunamadı");
            }
            return _mapper.Map<AdminUserViewIdModel>(data);
        }

        //Admin Kullanıcıyı Güncelleme
        public override async Task UpdateAsync(int id, AdminUserUpdateModel model)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException("Güncellenecek kullanıcı bulunamadı");
            }
            user.LastOnline = DateTime.Now;
            _mapper.Map(model, user);
            await _repository.UpdateAsync(user);

        }

        //Admin Kullanıcıyı Silme
        public override async Task DeleteAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException("Silinecek kullanıcı bulunamadı");
            }
            user.IsActive = false;
            await _repository.SaveAsync();
        }

        //Admin Kullanıcıyı Aktifleştirme
        public async Task ActivateUserAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException("Aktive edilecek kullanıcı bulunamadı");
            }
            user.IsActive = true;
            await _repository.SaveAsync();
        }

        //Kullanıcı Kendi Bilgilerini Görme
        public async Task<UserViewIdModel> GetOwnInfo(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException("Kullanıcı Bulunamadı");
            }
            return _mapper.Map<UserViewIdModel>(user);
        }

        //Kullanıcı Kendi Bilgilerini Güncelleme
        public async Task UpdateOwnInfo(int id, UserUpdateModel model)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user is null)
            {
                throw new KeyNotFoundException("Kullanıcı Bulunamadı");
            }
            _mapper.Map(model, user);
            await _repository.UpdateAsync(user);
        }

    }
}
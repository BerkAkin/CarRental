using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.DTOs.User;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Repositories.UserRepository;
using WebApi.Repository;

namespace WebApi.Services.UserService
{
    public class UserService : BaseService<User, object, UserUpdateModel, UserViewModel, UserViewIdModel, UserRepository>
    {

        private readonly PasswordHasher _passwordHasher;
        public UserService(UserRepository repository, IMapper mapper, PasswordHasher passwordHasher) : base(repository, mapper)
        {
            _passwordHasher = passwordHasher;
        }

        public override async Task<List<UserViewModel>> GetAllAsync()
        {
            var data = await _repository.GetAllAsync(query => query.Include(u => u.Role));
            if (data is null)
            {
                throw new InvalidOperationException("Veriler Bulunamadı");
            }
            return _mapper.Map<List<UserViewModel>>(data);
        }

        public override async Task<UserViewIdModel> GetByIdAsync(int id)
        {
            var data = await _repository.GetByIdAsync(id, query => query.Include(u => u.Role));
            if (data is null)
            {
                throw new InvalidOperationException("Veri Bulunamadı");
            }
            return _mapper.Map<UserViewIdModel>(data);
        }

        public override async Task UpdateAsync(int id, UserUpdateModel model)
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

        public override async Task AddAsync(object obj)
        {
            throw new NotImplementedException("Yöntem Geçersiz");
        }
    }
}
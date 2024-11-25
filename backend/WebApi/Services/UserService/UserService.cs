using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.DTOs.User;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.UserService
{
    public class UserService : BaseService<User, UserAddModel, UserUpdateModel, UserViewModel, UserViewIdModel>
    {
        public UserService(IRepository<User> repository, IMapper mapper) : base(repository, mapper)
        {
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
    }
}
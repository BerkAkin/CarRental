using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.DTOs.Comment;
using WebApi.Entities;
using WebApi.Repositories.GeneralRepositories.CommentRepository;
using WebApi.Repository;

namespace WebApi.Services.GeneralServices.CommentService
{
    public class CommentService : BaseService<UserComment, CommentAddModel, CommentUpdateModel, CommentViewModel, CommentViewIdModel, CommentRepository>

    {

        public CommentService(CommentRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }


        public override async Task<List<CommentViewModel>> GetAllAsync()
        {
            var data = await _repository.GetAllAsync(query => query.Include(u => u.User).Include(u => u.User.Role));
            if (data is null)
            {
                throw new InvalidOperationException("Veriler Bulunamadı");
            }
            return _mapper.Map<List<CommentViewModel>>(data);
        }

        public async Task<List<CommentViewModel>> GetLatestAsync()
        {
            var data = await _repository.GetLatest(query => query.Include(u => u.User).Include(u => u.User.Role));
            if (data is null)
            {
                throw new InvalidOperationException("Veriler Bulunamadı");
            }
            return _mapper.Map<List<CommentViewModel>>(data);
        }

        public override async Task<CommentViewIdModel> GetByIdAsync(int id)
        {
            var data = await _repository.GetByIdAsync(id, query => query.Include(u => u.User));
            if (data is null)
            {
                throw new InvalidOperationException("Veri Bulunamadı");
            }
            return _mapper.Map<CommentViewIdModel>(data);
        }

        public async Task UpdateOwnComment(int userId, CommentUpdateModel model)
        {
            var comment = await _repository.FindCommentByUserId(userId);
            if (comment == null)
            {
                throw new ArgumentNullException($"Güncellencek Veri Bulunamadı");
            }
            _mapper.Map(model, comment);
            await _repository.UpdateAsync(comment);
        }

        public async Task<CommentViewIdModel> GetOwnComment(int userId)
        {
            var comment = await _repository.FindCommentByUserId(userId);
            if (comment is null)
            {
                throw new KeyNotFoundException("Yorum Bulunamadı");

            }
            return _mapper.Map<CommentViewIdModel>(comment);
        }
    }

}
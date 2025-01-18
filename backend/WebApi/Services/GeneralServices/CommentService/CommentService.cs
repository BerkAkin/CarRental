using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Common;
using WebApi.DTOs.AdminDTOs;
using WebApi.DTOs.Comment;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.GeneralRepositories.CommentRepository;
using WebApi.Repository;

namespace WebApi.Services.GeneralServices.CommentService
{
    public class CommentService : BaseService<UserComment, CommentAddModel, CommentUpdateModel, CommentViewModel, CommentViewIdModel, CommentRepository>

    {

        public CommentService(CommentRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }


        public async Task<(List<AdminCommentViewModel>, int)> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {

            var (data, totalRecords) = await _repository.GetAllPaginatedAsync(pageNumber, pageSize, query => query.Include(u => u.User).ThenInclude(u => u.Role));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.COMMENTS_NOT_FOUND);
            }
            var DTOData = _mapper.Map<List<AdminCommentViewModel>>(data);
            return (DTOData, totalRecords);

        }

        public async Task AcceptComment(int id)
        {

            var comment = await _repository.GetByIdAsync(id, query => query.Where(com => com.IsActive == false));
            if (comment is null)
            {
                throw new KeyNotFoundException(ErrorMessages.COMMENT_ALREADY_ACCEPTED);
            }
            try
            {
                comment.IsActive = true;
                await _repository.UpdateAsync(comment);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }




        }

        public async Task RefuseComment(int id)
        {

            var comment = await _repository.GetByIdAsync(id, query => query.Where(com => com.IsActive == true));
            if (comment is null)
            {
                throw new KeyNotFoundException(ErrorMessages.COMMENT_ALREADY_REFUSED);
            }
            try
            {
                comment.IsActive = false;
                await _repository.UpdateAsync(comment);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }




        }
        public async Task<List<CommentViewModel>> GetLatestAsync()
        {

            var data = await _repository.GetLatest(query => query.Include(u => u.User).ThenInclude(u => u.Role).Where(cm => cm.IsActive == true));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.LATEST_COMMENT_NOT_FOUND);
            }
            return _mapper.Map<List<CommentViewModel>>(data);


        }

        public override async Task<CommentViewIdModel> GetByIdAsync(int id)
        {

            var data = await _repository.GetByIdAsync(id, query => query.Include(u => u.User));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.COMMENT_NOT_FOUND);
            }
            return _mapper.Map<CommentViewIdModel>(data);
        }

        public async Task UpdateOwnComment(int userId, CommentUpdateModel model)
        {

            var comment = await _repository.FindCommentByUserId(userId);
            if (comment == null)
            {
                throw new KeyNotFoundException(ErrorMessages.COMMENT_UPDATE_FAIL);
            }
            try
            {
                _mapper.Map(model, comment);
                await _repository.UpdateAsync(comment);
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }

        }

        public async Task<CommentViewIdModel> GetOwnComment(int userId)
        {
            var comment = await _repository.FindCommentByUserId(userId);
            if (comment is null)
            {
                throw new KeyNotFoundException(ErrorMessages.COMMENT_NOT_FOUND);
            }
            return _mapper.Map<CommentViewIdModel>(comment);
        }


        public async Task MarkCommentAsRead(int id)
        {
            var comment = await _repository.GetByIdAsync(id);
            if (comment is null)
            {
                throw new KeyNotFoundException(ErrorMessages.COMMENT_NOT_FOUND);
            }
            comment.IsNew = false;
            await _repository.UpdateAsync(comment);

        }
    }

}
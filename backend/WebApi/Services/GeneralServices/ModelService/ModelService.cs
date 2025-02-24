using System.Security.Cryptography;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using WebApi.Common;
using WebApi.DTOs.Models;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.GeneralRepositories.ModelRepository;
using WebApi.Validators.Model;

namespace WebApi.Services.GeneralServices.ModelService
{
    public class ModelService : BaseService<Model, ModelAddModel, ModelUpdateModel, ModelViewModel, ModelViewIdModel, ModelRepository>
    {

        public ModelService(ModelRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }

        public async Task AddAsync(ModelAddModel model)
        {
            ModelAddValidator validator = new ModelAddValidator();
            validator.ValidateAndThrow(model);
            var entity = _mapper.Map<Model>(model);
            entity.Slug = entity.BrandName + '-' + entity.ModelName + '-' + RandomNumGen();
            try
            {
                await _repository.AddAsync(entity);
            }
            catch (Exception)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }


        }

        public async Task UpdateAsync(ModelUpdateModel model)
        {
            ModelUpdateValidator validator = new ModelUpdateValidator();
            validator.ValidateAndThrow(model);

            var entity = await _repository.GetBySlugAsync(model.Slug);
            if (entity == null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERAL_UPDATE_FAIL);
            }
            _mapper.Map(model, entity);
            try
            {
                entity.Slug = entity.BrandName + '-' + entity.ModelName + '-' + RandomNumGen();
                await _repository.UpdateAsync(entity);
            }
            catch (Exception)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }



        }


        public async Task<(IEnumerable<ModelViewModel> Models, int TotalRecords)> GetAllPaginatedAsync(int pageNumber, int pageSize, string query)
        {
            var (data, totalRecords) = await _repository.GetAllPaginatedAsync(pageNumber, pageSize, query, func => func.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.MODELS_NOT_FOUND);
            }
            var DTOData = _mapper.Map<List<ModelViewModel>>(data);
            return (DTOData, totalRecords);
        }

        public async Task<ModelViewIdModel> GetByIdAsync(string slug)
        {

            var data = await _repository.GetBySlugAsync(slug, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.MODEL_NOT_FOUND);
            }
            return _mapper.Map<ModelViewIdModel>(data);


        }

        public async Task<(IEnumerable<ModelSummaryViewModel> Models, int TotalRecords)> GetPaginatedSummaryModels(int pageNumber, int pageSize)
        {

            var (data, totalRecords) = await _repository.GetAllSummaryPaginatedAsync(pageNumber, pageSize, query => query.Include(m => m.CarType).Include(m => m.FuelType).Include(m => m.GearType));
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.MODELS_SUMMARY_NOT_FOUND);
            }
            var DTOData = _mapper.Map<List<ModelSummaryViewModel>>(data);
            return (DTOData, totalRecords);
        }

        public async Task DeleteAsync(string slug)
        {
            var data = await _repository.GetBySlugAsync(slug);
            if (data is null)
            {
                throw new KeyNotFoundException(ErrorMessages.GENERAL_DELETE_FAIL);
            }
            try
            {
                await _repository.DeleteAsync(data);
            }
            catch (Exception)
            {
                throw new DatabaseException(ErrorMessages.DATABASE_ERROR);
            }
        }


        public async Task<string> UploadImage(IFormFile file)
        {
            if (file is null || file.Length == 0)
            {
                throw new DatabaseException("Dosya Seçilemedi");
            }

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            var extension = Path.GetExtension(file.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
            {
                throw new DatabaseException("Sadece JPG, PNG veya WebP dosyaları yükleyebilirsiniz.");
            }

            if (file.Length > 5 * 1024 * 1024)
            {
                throw new DatabaseException("Dosya boyutu maksimum 5MB olabilir.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var url = $"/uploads/{fileName}";
            return url;
        }



        private string RandomNumGen()
        {
            Random r = new Random();
            var x = r.Next(0, 1000000);
            string s = x.ToString("000000");
            return s;
        }


    }
}
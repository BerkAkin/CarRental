using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using WebApi.DTOs.LandingPage.ReasonTexts;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.LandingServices
{
    public class ReasonTextService
    {
        private readonly IRepository<LandingReasonText> _repository;
        private readonly IMapper _mapper;
        private readonly IValidator<LandingReasonAddModel> _addValidator;


        public ReasonTextService(IRepository<LandingReasonText> repository, IMapper mapper, IValidator<LandingReasonAddModel> addValidator)
        {
            _repository = repository;
            _mapper = mapper;
            _addValidator = addValidator;
        }

        public async Task<List<LandingReasonViewModel>> GetAllAsync()
        {
            var landingReasonTexts = await _repository.GetAllAsync();
            if (landingReasonTexts is null)
            {
                throw new InvalidOperationException("Sebep Yazıları Bulunamadı");
            }
            var landingReasonDTO = _mapper.Map<List<LandingReasonViewModel>>(landingReasonTexts);
            return landingReasonDTO;
        }


        public async Task<LandingReasonViewIdModel> GetByIdAsync(int id)
        {
            var landingReasonText = await _repository.GetByIdAsync(id);
            if (landingReasonText is null)
            {
                throw new InvalidOperationException("Sebep Yazısı Bulunamadı");
            }
            var landingReasonSingleDTO = _mapper.Map<LandingReasonViewIdModel>(landingReasonText);
            return landingReasonSingleDTO;
        }

        public async Task UpdateAsync(int id, LandingReasonUpdateModel model)
        {
            var landingReasonText = await _repository.GetByIdAsync(id);
            if (landingReasonText is null)
            {
                throw new ArgumentNullException("Güncellenecek Sebep Yazısı Bulunamadı");
            }
            _mapper.Map(model, landingReasonText);
            await _repository.UpdateAsync(landingReasonText);
        }

        public async Task AddAsync(LandingReasonAddModel model)
        {
            if (model is null)
            {
                throw new ArgumentNullException("Eklencek Veri Boş Olamaz");
            }
            await _addValidator.ValidateAndThrowAsync(model);
            var entity = _mapper.Map<LandingReasonText>(model);
            await _repository.AddAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity is null)
            {
                throw new KeyNotFoundException("Silinecek Sebep Yazısı Bulunamadı");

            }
            await _repository.DeleteAsync(entity);
        }
    }
}
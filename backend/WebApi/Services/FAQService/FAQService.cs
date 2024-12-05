using AutoMapper;
using WebApi.DTOs.FAQPage;
using WebApi.Entities;
using WebApi.Repositories.FAQRepository;
using WebApi.Repository;

namespace WebApi.Services.FAQService
{
    public class FAQService : BaseService<FAQText, FAQAddModel, FAQUpdateModel, FAQViewModel, FAQViewIdModel, FAQRepository>
    {
        public FAQService(FAQRepository repository, IMapper mapper) : base(repository, mapper) { }
    }
}
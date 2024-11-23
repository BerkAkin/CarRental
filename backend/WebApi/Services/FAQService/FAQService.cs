using AutoMapper;
using WebApi.DTOs.FAQPage;
using WebApi.Entities;
using WebApi.Repository;

namespace WebApi.Services.FAQService
{
    public class FAQService : BaseService<FAQText, FAQAddModel, FAQUpdateModel, FAQViewModel, FAQViewIdModel>
    {
        public FAQService(IRepository<FAQText> repository, IMapper mapper) : base(repository, mapper) { }
    }
}
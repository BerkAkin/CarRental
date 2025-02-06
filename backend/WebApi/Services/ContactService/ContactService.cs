using AutoMapper;
using FluentValidation;
using WebApi.Common;
using WebApi.DTOs.Contact;
using WebApi.Entities;
using WebApi.Exceptions;
using WebApi.Repositories.ContactRepository;
using WebApi.Services.GeneralServices.EmailService;
using WebApi.Validators.Contact;

namespace WebApi.Services.ContactService
{
    public class ContactService : BaseService<Contact, ContactAddModel, object, ContactViewModel, ContactViewIdModel, ContactRepository>
    {
        private readonly EmailService _emailService;

        public ContactService(ContactRepository repository, IMapper mapper, EmailService emailService) : base(repository, mapper)
        {
            _emailService = emailService;
        }


        public override async Task AddAsync(ContactAddModel model)
        {
            ContactValidator validator = new ContactValidator();
            validator.ValidateAndThrow(model);

            try
            {
                if (model.Permission == "evet")
                {
                    //Ekstra veri saklama işlemleri olacak burada
                }
                SendMail(model);
                await base.AddAsync(model);

            }
            catch (Exception)
            {
                throw new DatabaseException(ErrorMessages.EMAIL_CANNOT_SEND);
            }


        }

        public override Task<List<ContactViewModel>> GetAllAsync()
        {
            return base.GetAllAsync();
        }
        public override Task UpdateAsync(int id, object model)
        {

            return base.UpdateAsync(id, model);
        }



        private async void SendMail(ContactAddModel model)
        {
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "contactEmail.html");
            var emailBody = File.ReadAllText(templatePath);
            var replacements = new Dictionary<string, string>
                    {
                        { "{{Name}}", model.Name},
                        { "{{Surname}}", model.Surname },
                        { "{{Email}}",model.Email},
                        { "{{Phone}}", model.Phone},
                        { "{{Permission}}", model.Permission},
                        { "{{Platform}}",  model.Platform},
                    };
            emailBody = replacements.Aggregate(emailBody, (current, replacement) => current.Replace(replacement.Key, replacement.Value));
            await _emailService.SendContactEmailAsync("Müşteri İletişim Talebi", emailBody);
        }
    }
}
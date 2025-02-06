using System.Net;
using System.Net.Mail;

namespace WebApi.Services.GeneralServices.EmailService
{

    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        Task SendContactEmailAsync(string subject, string body);
    }


    public class EmailService
    {
        private readonly string _fromEmail;
        private readonly string _adminEmail;
        private readonly SmtpClient _smtpClient;


        public EmailService(IConfiguration configuration)
        {
            var emailSettings = configuration.GetSection("EmailSettings");

            _smtpClient = new SmtpClient(emailSettings["Host"])
            {
                Port = int.Parse(emailSettings["Port"]),
                Credentials = new NetworkCredential(emailSettings["Username"], emailSettings["Password"]),
                EnableSsl = true
            };

            _fromEmail = emailSettings["FromEmail"];
            _adminEmail = emailSettings["AdminEmail"];
        }


        public async Task SendEmailAsync(string to, string subject, string body)
        {
            await SendEmailInternalAsync(to, subject, body);
        }

        public async Task SendContactEmailAsync(string subject, string body)
        {
            await SendEmailInternalAsync(_adminEmail, subject, body);
        }


        private async Task SendEmailInternalAsync(string to, string subject, string body)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(to);
            await _smtpClient.SendMailAsync(mailMessage);
        }

    }
}
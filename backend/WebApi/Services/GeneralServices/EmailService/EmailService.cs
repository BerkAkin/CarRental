using System.Net;
using System.Net.Mail;

namespace WebApi.Services.GeneralServices.EmailService
{

    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
    public class EmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");
            var smtpClient = new SmtpClient(emailSettings["Host"])
            {
                Port = int.Parse(emailSettings["Port"]),
                Credentials = new NetworkCredential(emailSettings["Username"], emailSettings["Password"]),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(emailSettings["FromEmail"]),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(to);
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
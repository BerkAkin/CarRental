using System.Data;
using WebApi.Exceptions;
using WebApi.Helpers;

namespace WebApi.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await HandleExceptionAsync(context, exception);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = exception switch
            {
                DatabaseException => 500,
                RefreshException => 452,
                KeyNotFoundException => 404,
                InvalidOperationException => 400,
                DuplicateNameException => 409,
                UnauthorizedAccessException => 401,
                _ => 500
            };

            var message = exception switch
            {
                DatabaseException => "Sunucu tarafında hata oluştu, lütfen yöneticiyle iletişime geçin: ",
                RefreshException => "Oturum süresi doldu, lütfen yeniden giriş yapınız.",
                KeyNotFoundException => "Veri bulunamadı: ",
                InvalidOperationException => "Geçersiz işlem: ",
                DuplicateNameException => "Birden fazla kayıt hatası: ",
                _ => "Bilinmeyen bir hata oluştu."

            };

            var responseMessage = $"{message}{exception.Message}";

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";
            return context.Response.WriteAsync(ExceptionResponseHelper.ToJson(statusCode, responseMessage));
        }
    }
}
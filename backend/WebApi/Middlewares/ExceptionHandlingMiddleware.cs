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
                KeyNotFoundException => 404,
                ArgumentNullException => 400,
                InvalidOperationException => 400,
                DuplicateNameException => 409,
            };

            var message = exception switch
            {
                DatabaseException => "Sunucu tarafında hata oluştu, lütfen yöneticiyle iletişime geçin: ",
                KeyNotFoundException => "Veri bulunamadı: ",
                ArgumentNullException => "Girdi hatası: ",
                InvalidOperationException => "Geçersiz işlem: ",
                DuplicateNameException => "Çoklu veri hatası: ",

            };

            var responseMessage = $"{message}{exception.Message}";

            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";
            return context.Response.WriteAsync(ExceptionResponseHelper.ToJson(statusCode, responseMessage));
        }
    }
}
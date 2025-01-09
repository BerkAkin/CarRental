using System.Text.Json;

namespace WebApi.Helpers
{
    public static class ExceptionResponseHelper
    {
        public static string ToJson(int statusCode, string message)
        {
            return JsonSerializer.Serialize(new
            {
                statusCode = statusCode,
                message = message
            });
        }
    }
}
namespace WebApi.Exceptions
{
    public class RefreshException : Exception
    {
        public RefreshException() { }
        public RefreshException(string message) : base(message) { }
        public RefreshException(string message, Exception innerException) : base(message, innerException) { }
    }
}
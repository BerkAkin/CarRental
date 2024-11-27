using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;

namespace WebApi.Helpers
{
    public class PasswordHasher
    {
        public string HashPassword(string password)
        {
            using (var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                argon2.Salt = GenerateSalt();
                argon2.DegreeOfParallelism = 2;
                argon2.MemorySize = 65536;
                argon2.Iterations = 4;
                return Convert.ToBase64String(argon2.GetBytes(32));
            }
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            throw new NotImplementedException("Hash doğrulama işlemi burada yapılacak.");
        }

        private byte[] GenerateSalt()
        {
            var salt = new byte[16];
            RandomNumberGenerator.Fill(salt);
            return salt;
        }
    }
}
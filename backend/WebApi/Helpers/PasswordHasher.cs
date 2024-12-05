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
                byte[] salt = GenerateSalt();
                argon2.Salt = salt;
                argon2.DegreeOfParallelism = 2;
                argon2.MemorySize = 65536;
                argon2.Iterations = 4;
                var hash = Convert.ToBase64String(argon2.GetBytes(32));
                return Convert.ToBase64String(salt) + ":" + hash;
            }
        }

        public bool VerifyPassword(string password, string storedHash)
        {
            var parts = storedHash.Split(':');
            var storedSalt = Convert.FromBase64String(parts[0]);
            var storedHashBytes = Convert.FromBase64String(parts[1]);
            using (var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                argon2.Salt = storedSalt;
                argon2.DegreeOfParallelism = 2;
                argon2.MemorySize = 65536;
                argon2.Iterations = 4;

                var hashBytes = argon2.GetBytes(32);
                return hashBytes.SequenceEqual(storedHashBytes);
            }
        }

        private byte[] GenerateSalt()
        {
            var salt = new byte[16];
            RandomNumberGenerator.Fill(salt);
            return salt;
        }
    }
}
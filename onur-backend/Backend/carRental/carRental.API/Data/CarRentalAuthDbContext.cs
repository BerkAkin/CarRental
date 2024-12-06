using carRental.API.Models.DTO.auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace carRental.API.Data
{
    public class CarRentalAuthDbContext : IdentityDbContext<ApplicationUser>
    {
        public CarRentalAuthDbContext(DbContextOptions<CarRentalAuthDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var userRoleId = "4382af7d-da73-4cbe-a038-442eb85d5a9d";
            var adminRoleId = "390754dd-5835-44e1-851b-ec9b7f096cc7";

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = userRoleId,
                    ConcurrencyStamp = userRoleId,
                    Name = "user",
                    NormalizedName = "user".ToUpper(),
                },
                new IdentityRole
                {
                    Id = adminRoleId,
                    ConcurrencyStamp = adminRoleId,
                    Name = "admin",
                    NormalizedName = "admin".ToUpper(),
                }
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);

        }
    }
}

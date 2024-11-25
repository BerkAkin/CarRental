using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.DbOperations
{
    public class CRDbContext : DbContext
    {
        public CRDbContext(DbContextOptions<CRDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserComment>().HasIndex(uc => uc.UserId).IsUnique();
        }


        public DbSet<LandingMainText> LandingMainTexts { get; set; }
        public DbSet<LandingReasonText> LandingReasonTexts { get; set; }
        public DbSet<LandingServiceText> LandingServiceTexts { get; set; }
        public DbSet<FAQText> FAQTexts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserComment> UserComments { get; set; }
    }
}
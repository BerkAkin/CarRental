using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.DbOperations
{
    public class CRDbContext : DbContext
    {
        public CRDbContext(DbContextOptions<CRDbContext> options) : base(options) { }
        public DbSet<LandingMainText> LandingMainTexts { get; set; }
        public DbSet<LandingReasonText> LandingReasonTexts { get; set; }
        public DbSet<LandingServiceText> LandingServiceTexts { get; set; }
        public DbSet<FAQText> FAQTexts { get; set; }
    }
}
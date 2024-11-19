using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.DbOperations
{
    public class CRDbContext : DbContext
    {
        public CRDbContext(DbContextOptions<CRDbContext> options) : base(options) { }
        public DbSet<LandingMainText> LandingPageMainTexts { get; set; }
        public DbSet<LandingReasonText> LandingReasonTexts { get; set; }
    }
}
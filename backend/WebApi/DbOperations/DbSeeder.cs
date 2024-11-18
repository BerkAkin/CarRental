
using WebApi.Entities;

namespace WebApi.DbOperations
{
    public class DbSeeder
    {
        private readonly CRDbContext _context;

        public DbSeeder(CRDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            if (!_context.LandingPageMainTexts.Any())
            {
                var landingPageTexts = new List<LandingMainText>
                {
                    new LandingMainText { Text = "Ana Sayfa Başlık 1"},
                };

                _context.LandingPageMainTexts.AddRange(landingPageTexts);
                await _context.SaveChangesAsync();
            }
        }
    }

}

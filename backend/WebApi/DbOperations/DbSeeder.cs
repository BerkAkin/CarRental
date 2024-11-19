
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

                var landingPageReasonTexts = new List<LandingReasonText>
                {
                    new LandingReasonText { Title  = "Ana Sayfa Başlık 1", Content = "deneme içerik"},
                };


                _context.LandingPageMainTexts.AddRange(landingPageTexts);
                _context.LandingReasonTexts.AddRange(landingPageReasonTexts);

                await _context.SaveChangesAsync();
            }
        }
    }

}

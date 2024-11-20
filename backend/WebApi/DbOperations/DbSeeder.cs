
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
            if (!_context.LandingMainTexts.Any())
            {
                var landingPageMainTexts = new List<LandingMainText>
                {
                    new LandingMainText { Text = "Ana Sayfa Başlık 1"},
                };

                var landingPageReasonTexts = new List<LandingReasonText>
                {
                    new LandingReasonText { Title  = "Ana Sayfa Başlık 1", Content = "deneme içerik"},
                };

                var landingPageService = new List<LandingServiceText>
                {
                    new LandingServiceText { Title  = "Ana Sayfa Başlık 1", Content = "deneme içerik", Icon ="fa fa-car"},
                };


                _context.LandingMainTexts.AddRange(landingPageMainTexts);
                _context.LandingReasonTexts.AddRange(landingPageReasonTexts);
                _context.LandingServiceTexts.AddRange(landingPageService);

                await _context.SaveChangesAsync();
            }
        }
    }

}

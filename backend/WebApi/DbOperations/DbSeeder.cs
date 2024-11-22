
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
                    new LandingMainText { Text = "Araç abonelik sistemi, sizi karmaşık prosedürlerle boğulmaktan kurtararak özgürlüğün tadını çıkarmanızı sağlar. Sadece istediğiniz araç modelini seçin ve her şey dahil paketlerimizden birini tercih edin. Aracınız kapınıza kadar teslim edilsin, anahtarları alın ve sadece sürmeye başlayın. Geri kalan tüm detaylar ve işlemler bizim sorumluluğumuzda. Siz sadece sürün, gerisini biz halledelim!"},
                };

                var landingPageReasonTexts = new List<LandingReasonText>
                {
                    new LandingReasonText { Title  = "Esnek Paketler", Content = "6 ve 9 aylık esnek abonelik paketlerimiz ile dilediğiniz zaman aracınızı ve abonelik paketinizi değiştirebilirsiniz. 2 yıllık bağlayıcı sözleşmelere veda edin!"},
                    new LandingReasonText { Title  = "Müşteri Memnuniyeti", Content = "Müşteri merkezli hizmet politikamız ile %100 müşteri memnuniyeti sunuyoruz. Her müşterimize özel birebir hizmet!"},
                    new LandingReasonText { Title  = "Sürpriz Masraf Yok", Content = "İhtiyacınız olabilecek her hizmet için sabit aylık bir ücret ödersiniz. Herhangi bir ek ücrete yada sürprize son!"},
                    new LandingReasonText { Title  = "Özgürlük ve Rahatlık", Content = "Karmaşık prosedürlerle uğraşmadan araç sahibi olmanın keyfini çıkarın"},
                    new LandingReasonText { Title  = "Araç Seçeneği", Content = "İstediğiniz araç modelini seçme özgürlüğüne sahip olun."},
                    new LandingReasonText { Title  = "Her Şey Dahil Paketler", Content = "Kapsamlı paket seçeneklerimiz arasından isteğinize uygun olanı seçin."},
                };

                var landingPageService = new List<LandingServiceText>
                {
                    new LandingServiceText { Title  = "Ücretsiz Araç Yıkama", Content = "İkamet ettiğiniz ildeki tüm Otovınn noktlarında ayda 2 Ücretsiz iç-dış yıkama temizlik hizmetinden yararlanabilirsiniz.", Icon ="faCar"},
                    new LandingServiceText { Title  = "Ücretsiz Otopark", Content = "Üyeliğiniz kapsamında ayda toplamda 300 TL`lik limitiniz dahilinde yararlanabilirsiniz.", Icon ="faParking"},
                    new LandingServiceText { Title  = "HGS Sistemleri", Content = "Araçlarımız, HGS ve OGS sistemlerini kullanarak geçiş noktalarında sorunsuz bir şekilde kullanılabilir.", Icon ="faRoad"},
                    new LandingServiceText { Title  = "Otobil ile Yakıt alma imkanı", Content = "Flexper araç aboneliği kapsamında aracınızda Otobil cihazı mevcut olup, dilemeniz durumunda yakıtınızı bu cihaz ile para ödemeden alabilir, ay sonunda abonelik bedelinize ek olarak toplu halde ödemesini Flexper`a yapabilirsiniz.", Icon ="faGasPump"},
                    new LandingServiceText { Title  = "Kapıya Hizmet", Content = "Size özel olarak sunulan hizmetimiz sayesinde, aracınız kapınıza teslim edilir.", Icon ="faKey"},
                    new LandingServiceText { Title  = "Ücretsiz Vale", Content = "İkamet ettiğiniz ildeki tüm valelerden 300 TL`lik  limitiniz dahilinde yararlanabilirsiniz.", Icon ="faHandSparkles"},
                };


                _context.LandingMainTexts.AddRange(landingPageMainTexts);
                _context.LandingReasonTexts.AddRange(landingPageReasonTexts);
                _context.LandingServiceTexts.AddRange(landingPageService);

                await _context.SaveChangesAsync();
            }
        }
    }

}

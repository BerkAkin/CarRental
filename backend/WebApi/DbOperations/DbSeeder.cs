
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

                var FAQ = new List<FAQText>{
                    new FAQText { Title= "Flexper nedir?", Content= "Flexper, yenilikçi mobilite çözümleri geliştirmek amacıyla çok alternatifli ve müşteri merkezli yeni bir abonelik hizmeti olarak faaliyete girmiş bir projedir. Daha fazla bilgi için Biz Kimiz? sayfasını ziyaret edebilirsiniz." },
                    new FAQText { Title= "Araç aboneliği nedir?", Content= "Araç aboneliği, araç ihtiyacınızı karşılamak için üretilen alternatif bir iş modelidir. Son zamanlarda popülerleşen abonelik hizmetlerinin en çok dikkat çeken örneklerinden birisi olan araç aboneliği bireysel kullanıcılara büyük avantajlar sağlıyor." },
                    new FAQText { Title= "Nasıl abone olurum?", Content= "Flexper sitemizi inceledikten sonra bir araç seçin. Sonrasında bize talebinizi Bilgi İletişim ve Talep Formumuz ile iletin. Biz size ulaşalım ve ayrıntıları konuşalım. Not: Dilerseniz bu formu sadece bilgi sahibi olmak için de kullanabilirsiniz." },
                    new FAQText { Title= "Abonelik sistemine giriş ücreti var mı?", Content= "Sisteme giriş esnasında depozito amaçlı 1 aylık kira bedeli talep edilmekte olup abonelik dönemi sonunda bu bedel kullanıcıya gerekli şartların sağlanması durumunda iade edilmektedir." },
                    new FAQText { Title= "Abonelik için gerekli ön şartlar nelerdir?", Content= "25 yaş ve üzerinde olmak 3 yıl ve üzeri T.C., AB veya uluslararası geçerliliği olan B tipi (veya üzeri) bir ehliyete sahip olmak" },
                    new FAQText { Title= "Aylık abonelik bedelini nasıl ödeyeceğim?", Content= "Projemiz kapsamında anlaşmalı olduğumuz banka güvencesiyle ödemelerinizi gerçekleştirebilirsiniz. Ayrıntılı bilgi için bizimle irtibata geçebilirsiniz." },
                    new FAQText { Title= "Aile Paketi Nedir?", Content= "Flexper’da artık seçmiş olduğunuz aracı ailenizle birlikte kullanabilirsiniz! Aylık sadece 699 TL+KDV/Birey ödeyerek dilediğiniz aile bireyini araca ek kullanıcı olarak tanımlayabilir ve sizin aracı kullanmadığınız zamanlarda aile bireylerinizin mobilite ihtiyacını karşılayabilirsiniz. Ek Kullanıcı olarak sadece siz ile aynı adreste ikamet eden birinci derece yakınlarınızı(anne-baba-kardeş-eş-çocuk) tanımlayabilirsiniz. Ayrıntılı bilgi için bizimle iletişime geçin!" },
                    new FAQText { Title= "Size nasıl ulaşırım?", Content= " sayfamız üzerinden bilgi ve talep formumuzu doldurmanız yeterli. Ekip arkadaşlarımız en kısa sürede tarafınıza ulaşıp ayrıntılı bilgi veriyor olacaklar. Whatsapp ve  İletişim hattımız: +90 543 353 97 37 E-Posta adresimiz: info@flexper.com.tr" },
                    new FAQText { Title= "Aradığım sorunun yanıtını bulamadım. Bana yardımcı olur musunuz?", Content= " sayfamız üzerinden ulaşabilirsiniz. Eğer aradığım sorunun yanıtı buralarda yok diyorsanız sayfamız üzerinden bilgi ve talep formunu doldurabilirsiniz. Arkadaşlarımız kısa süre içersinde size ulaşıp sorularınıza yanıt vereceklerdir. " },

                };


                _context.LandingMainTexts.AddRange(landingPageMainTexts);
                _context.LandingReasonTexts.AddRange(landingPageReasonTexts);
                _context.LandingServiceTexts.AddRange(landingPageService);
                _context.FAQTexts.AddRange(FAQ);

                await _context.SaveChangesAsync();
            }
        }
    }

}

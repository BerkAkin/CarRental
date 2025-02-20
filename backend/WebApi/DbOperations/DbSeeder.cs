
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

                var Icons = new List<Icon>{
                    new Icon{Name="faCar",Label="Araç"},
                    new Icon{Name="faParking", Label="Park"},
                    new Icon{Name="faGasPump", Label="Pompa"},
                    new Icon{Name="faRoad", Label="Yol"},
                    new Icon{Name="faHandSparkles", Label="El"},
                    new Icon{Name="faKey", Label="Anahtar"},
                    new Icon{Name="faGauge", Label="Gösterge"},
                    new Icon{Name="faBattery", Label="Batarya"},
                    new Icon{Name="faTrafficLight", Label="Trafik Işığı"},
                    new Icon{Name="faMoneyBill", Label="Banknot"},
                    new Icon{Name="faLocationPin", Label="Lokasyon"},
                    new Icon{Name="faWrench", Label="İngiliz Anahtarı"},
                    new Icon{Name="faEdit", Label="Düzenleme"},
                };
                _context.Icons.AddRange(Icons);
                await _context.SaveChangesAsync();


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
                    new LandingServiceText { Title  = "Ücretsiz Araç Yıkama", Content = "İkamet ettiğiniz ildeki tüm Otovınn noktlarında ayda 2 Ücretsiz iç-dış yıkama temizlik hizmetinden yararlanabilirsiniz.", IconId=1},
                    new LandingServiceText { Title  = "Ücretsiz Otopark", Content = "Üyeliğiniz kapsamında ayda toplamda 300 TL`lik limitiniz dahilinde yararlanabilirsiniz.", IconId=1 },
                    new LandingServiceText { Title  = "HGS Sistemleri", Content = "Araçlarımız, HGS ve OGS sistemlerini kullanarak geçiş noktalarında sorunsuz bir şekilde kullanılabilir.", IconId=1},
                    new LandingServiceText { Title  = "Otobil ile Yakıt alma imkanı", Content = "Flexper araç aboneliği kapsamında aracınızda Otobil cihazı mevcut olup, dilemeniz durumunda yakıtınızı bu cihaz ile para ödemeden alabilir, ay sonunda abonelik bedelinize ek olarak toplu halde ödemesini Flexper`a yapabilirsiniz.", IconId=2},
                    new LandingServiceText { Title  = "Kapıya Hizmet", Content = "Size özel olarak sunulan hizmetimiz sayesinde, aracınız kapınıza teslim edilir.", IconId=1},
                    new LandingServiceText { Title  = "Ücretsiz Vale", Content = "İkamet ettiğiniz ildeki tüm valelerden 300 TL`lik  limitiniz dahilinde yararlanabilirsiniz.", IconId=1},
                };

                var FAQ = new List<FAQText>{
                    new FAQText { Title= "Flexper nedir?", Content= "Flexper, yenilikçi mobilite çözümleri geliştirmek amacıyla çok alternatifli ve müşteri merkezli yeni bir abonelik hizmeti olarak faaliyete girmiş bir projedir. Daha fazla bilgi için Biz Kimiz? sayfasını ziyaret edebilirsiniz." },
                    new FAQText { Title= "Araç aboneliği nedir?", Content= "Araç aboneliği, araç ihtiyacınızı karşılamak için üretilen alternatif bir iş modelidir. Son zamanlarda popülerleşen abonelik hizmetlerinin en çok dikkat çeken örneklerinden birisi olan araç aboneliği bireysel kullanıcılara büyük avantajlar sağlıyor." },
                    new FAQText { Title= "Nasıl abone olurum?", Content= "Flexper sitemizi inceledikten sonra bir araç seçin. Sonrasında bize talebinizi Bilgi İletişim ve Talep Formumuz ile iletin. Biz size ulaşalım ve ayrıntıları konuşalım. Not: Dilerseniz bu formu sadece bilgi sahibi olmak için de kullanabilirsiniz." },
                    new FAQText { Title= "Abonelik sistemine giriş ücreti var mı?", Content= "Sisteme giriş esnasında depozito amaçlı 1 aylık kira bedeli talep edilmekte olup abonelik dönemi sonunda bu bedel kullanıcıya gerekli şartların sağlanması durumunda iade edilmektedir." },
                    new FAQText { Title= "Abonelik için gerekli ön şartlar nelerdir?", Content= "25 yaş ve üzerinde olmak 3 yıl ve üzeri T.C., AB veya uluslararası geçerliliği olan B tipi (veya üzeri) bir ehliyete sahip olmak" },
                    new FAQText { Title= "Aylık abonelik bedelini nasıl ödeyeceğim?", Content= "Projemiz kapsamında anlaşmalı olduğumuz banka güvencesiyle ödemelerinizi gerçekleştirebilirsiniz. Ayrıntılı bilgi için bizimle irtibata geçebilirsiniz." },
                    new FAQText { Title= "Aile Paketi Nedir?", Content= "Flexper’da artık seçmiş olduğunuz aracı ailenizle birlikte kullanabilirsiniz! Aylık sadece 699 TL+KDV/Birey ödeyerek dilediğiniz aile bireyini araca ek kullanıcı olarak tanımlayabilir ve sizin aracı kullanmadığınız zamanlarda aile bireylerinizin mobilite ihtiyacını karşılayabilirsiniz. Ek Kullanıcı olarak sadece siz ile aynı adreste ikamet eden birinci derece yakınlarınızı(anne-baba-kardeş-eş-çocuk) tanımlayabilirsiniz. Ayrıntılı bilgi için bizimle iletişime geçin!" },
                    new FAQText { Title= "Size nasıl ulaşırım?", Content= " sayfamız üzerinden bilgi ve talep formumuzu doldurmanız yeterli. Ekip arkadaşlarımız en kısa sürede tarafınıza ulaşıp ayrıntılı bilgi veriyor olacaklar. Whatsapp ve  İletişim hattımız: emptyPhoneNumber E-Posta adresimiz: emptyMail" },
                    new FAQText { Title= "Aradığım sorunun yanıtını bulamadım. Bana yardımcı olur musunuz?", Content= " sayfamız üzerinden ulaşabilirsiniz. Eğer aradığım sorunun yanıtı buralarda yok diyorsanız sayfamız üzerinden bilgi ve talep formunu doldurabilirsiniz. Arkadaşlarımız kısa süre içersinde size ulaşıp sorularınıza yanıt vereceklerdir. " },

                };

                var Roles = new List<Role>{
                    new Role {Name= "Admin", Description="Yönetici Rolü Bilgisi"},
                    new Role {Name= "Flexper Abonesi", Description="Abone Rolü Bilgisi"},
                    new Role {Name= "SuperUser", Description="Süper Kullanıcı Rolü Bilgisi"},
                };

                var Users = new List<User>{
                    new User{Name = "John", Surname = "Doe", Email = "john.doe@example.com", PasswordHashed = "123", PhoneNum="1234215", IsActive = true, RoleId = 1, LastOnline = DateTime.UtcNow, CreatedAt = DateTime.UtcNow, RefreshToken="saknfdsugı2.şlasoıbasfıo.oı1238924n", ResetToken="aslkdgsjbsafkmsaf",},
                    new User{Name = "Oak", Surname = "Anthony", Email = "oak.smith@example.com", PasswordHashed = "123", PhoneNum="1234215",  IsActive = true, RoleId = 2, LastOnline = DateTime.UtcNow.AddDays(-1), CreatedAt = DateTime.UtcNow.AddMonths(-2), RefreshToken="saknfdsugı2.şlasoıbasfıo.oı1238924n", ResetToken="aslkdgsjbsafkmsaf",},
                    new User{Name = "Jill", Surname = "Denver", Email = "jill.smith@example.com", PasswordHashed = "123", PhoneNum="1234215",  IsActive = true, RoleId = 2, LastOnline = DateTime.UtcNow.AddDays(-1), CreatedAt = DateTime.UtcNow.AddMonths(-4), RefreshToken="saknfdsugı2.şlasoıbasfıo.oı1238924n", ResetToken="aslkdgsjbsafkmsaf",},
                    new User{Name = "Dean", Surname = "Stark", Email = "dean.smith@example.com", PasswordHashed = "123", PhoneNum="1234215",  IsActive = true, RoleId = 2, LastOnline = DateTime.UtcNow.AddDays(-1), CreatedAt = DateTime.UtcNow.AddMonths(-1), RefreshToken="saknfdsugı2.şlasoıbasfıo.oı1238924n", ResetToken="aslkdgsjbsafkmsaf",},
                    new User{Name = "Dallas", Surname = "Flynn", Email = "dallas.smith@example.com", PasswordHashed = "123", PhoneNum="1234215",  IsActive = true, RoleId = 2, LastOnline = DateTime.UtcNow.AddDays(-1), CreatedAt = DateTime.UtcNow.AddMonths(-10), RefreshToken="saknfdsugı2.şlasoıbasfıo.oı1238924n", ResetToken="aslkdgsjbsafkmsaf",},
                    new User{Name = "David", Surname = "Scott", Email = "david.smith@example.com", PasswordHashed = "123", PhoneNum="1234215",  IsActive = true, RoleId = 2, LastOnline = DateTime.UtcNow.AddDays(-1), CreatedAt = DateTime.UtcNow, RefreshToken="saknfdsugı2.şlasoıbasfıo.oı1238924n", ResetToken="aslkdgsjbsafkmsaf",}
                };

                var Comments = new List<UserComment>{
                    new UserComment{Content="Gerçekten Çok İyi", UserId=1,  StarCount=5},
                    new UserComment{Content="Dönemsel olarak ekonomik koşullarda araç kiralayabilme imkanı sağlamaları bu projeyi tercih etmemi sağladı", UserId=2, StarCount=3},
                    new UserComment{Content="Hiçbir şeyi düşünmüyorum benim için düşünenler var, her zaman arayabileceğim kişiler var.", UserId=3, StarCount=5},
                    new UserComment{Content="Muhteşem bir hizmet", UserId=4, StarCount=1},
                    new UserComment{Content="Flexper projesini ilk defa duyduğumda heyecanlanmıştım. Gayet ekonomik bir çözüm olduğunu söyleyebilirim", UserId=5, StarCount=3},
                    new UserComment{Content="Araç abonelik rahatlığını ben de yaşamak istedim.", UserId=6, StarCount=6}
                };

                var Fuels = new List<FuelType>{
                    new FuelType{Fuel="Benzin"},
                    new FuelType{Fuel="Dizel"},
                    new FuelType{Fuel="Elektrikli"},
                    new FuelType{Fuel="Hibrit"},
                };

                var Gears = new List<GearType>{
                    new GearType{Gear="Otomatik"},
                    new GearType{Gear="Manuel"},
                    new GearType{Gear="Yarı Otomatik"},
                };

                var Cars = new List<CarType>{
                    new CarType{Car="Sedan"},
                    new CarType{Car="SUV"},
                    new CarType{Car="Hatchback"},
                    new CarType{Car="Coupe"},
                    new CarType{Car="Station"},
                    new CarType{Car="Cabriolet"},
                    new CarType{Car="Pick-up"},
                    new CarType{Car="MPV"},
                    new CarType{Car="Van"},
                    new CarType{Car="Roadster"},
                    new CarType{Car="Crossover"},
                    new CarType{Car="MicroCar"},
                };

                var Models = new List<Model>{
                    new Model{Slug ="toyota-corolla-136241",BrandName = "Toyota",ModelName = "Corolla",Description = "Reliable and fuel-efficient compact car.",PersonCount = 5,LuggageCount = 3,DoorCount = 4,Price = 20000,FuelTypeId = 1, GearTypeId = 1,CarTypeId = 1, OtherServices = new[] { "Roadside Assistance", "Free Delivery" },OtherFeatures = new[] { "Air Conditioning", "Bluetooth" },ImageDirectory = "images/toyota_corolla.jpg",CreatedAt = DateTime.Now,UpdatedAt = DateTime.Now},
                };

                var Favorites = new List<UserFavorite>{
                    new UserFavorite{ ModelId=1, UserId=1, }
                };




                _context.LandingMainTexts.AddRange(landingPageMainTexts);
                _context.LandingReasonTexts.AddRange(landingPageReasonTexts);
                _context.LandingServiceTexts.AddRange(landingPageService);
                _context.FAQTexts.AddRange(FAQ);
                await _context.SaveChangesAsync();

                _context.Roles.AddRange(Roles);
                await _context.SaveChangesAsync();

                _context.Users.AddRange(Users);
                await _context.SaveChangesAsync();

                _context.UserComments.AddRange(Comments);
                await _context.SaveChangesAsync();

                _context.FuelTypes.AddRange(Fuels);
                _context.GearTypes.AddRange(Gears);
                _context.CarTypes.AddRange(Cars);
                await _context.SaveChangesAsync();

                _context.Models.AddRange(Models);
                await _context.SaveChangesAsync();

                _context.UserFavorites.AddRange(Favorites);
                await _context.SaveChangesAsync();



            }
        }
    }

}

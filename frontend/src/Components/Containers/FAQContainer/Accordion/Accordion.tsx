import React, { useState } from 'react';
import AccordionItem from './Item/AccordionItem';

interface AccordionItemData {
    title: string;
    content: string;
}

const accordionData: AccordionItemData[] = [
    { title: 'Flexper nedir?', content: 'Flexper, yenilikçi mobilite çözümleri geliştirmek amacıyla çok alternatifli ve müşteri merkezli yeni bir abonelik hizmeti olarak faaliyete girmiş bir projedir. Daha fazla bilgi için Biz Kimiz? sayfasını ziyaret edebilirsiniz.' },
    { title: 'Araç aboneliği nedir?', content: 'Araç aboneliği, araç ihtiyacınızı karşılamak için üretilen alternatif bir iş modelidir. Son zamanlarda popülerleşen abonelik hizmetlerinin en çok dikkat çeken örneklerinden birisi olan araç aboneliği bireysel kullanıcılara büyük avantajlar sağlıyor.' },
    { title: 'Nasıl abone olurum?', content: 'Flexper sitemizi inceledikten sonra bir araç seçin. Sonrasında bize talebinizi Bilgi İletişim ve Talep Formumuz ile iletin. Biz size ulaşalım ve ayrıntıları konuşalım. Not: Dilerseniz bu formu sadece bilgi sahibi olmak için de kullanabilirsiniz.' },
    { title: 'Abonelik sistemine giriş ücreti var mı?', content: 'Sisteme giriş esnasında depozito amaçlı 1 aylık kira bedeli talep edilmekte olup abonelik dönemi sonunda bu bedel kullanıcıya gerekli şartların sağlanması durumunda iade edilmektedir.' },
    { title: 'Abonelik için gerekli ön şartlar nelerdir?', content: '25 yaş ve üzerinde olmak 3 yıl ve üzeri T.C., AB veya uluslararası geçerliliği olan B tipi (veya üzeri) bir ehliyete sahip olmak' },
    { title: 'Aylık abonelik bedelini nasıl ödeyeceğim?', content: 'Projemiz kapsamında anlaşmalı olduğumuz banka güvencesiyle ödemelerinizi gerçekleştirebilirsiniz. Ayrıntılı bilgi için bizimle irtibata geçebilirsiniz.' },
    { title: 'Aile Paketi Nedir?', content: 'Flexper’da artık seçmiş olduğunuz aracı ailenizle birlikte kullanabilirsiniz! Aylık sadece 699 TL+KDV/Birey ödeyerek dilediğiniz aile bireyini araca ek kullanıcı olarak tanımlayabilir ve sizin aracı kullanmadığınız zamanlarda aile bireylerinizin mobilite ihtiyacını karşılayabilirsiniz. Ek Kullanıcı olarak sadece siz ile aynı adreste ikamet eden birinci derece yakınlarınızı(anne-baba-kardeş-eş-çocuk) tanımlayabilirsiniz. Ayrıntılı bilgi için bizimle iletişime geçin!' },
    { title: 'Size nasıl ulaşırım?', content: ' sayfamız üzerinden bilgi ve talep formumuzu doldurmanız yeterli. Ekip arkadaşlarımız en kısa sürede tarafınıza ulaşıp ayrıntılı bilgi veriyor olacaklar. Whatsapp ve  İletişim hattımız: +90 543 353 97 37 E-Posta adresimiz: info@flexper.com.tr' },
    { title: 'Aradığım sorunun yanıtını bulamadım. Bana yardımcı olur musunuz?', content: ' sayfamız üzerinden ulaşabilirsiniz. Eğer aradığım sorunun yanıtı buralarda yok diyorsanız sayfamız üzerinden bilgi ve talep formunu doldurabilirsiniz. Arkadaşlarımız kısa süre içersinde size ulaşıp sorularınıza yanıt vereceklerdir. ' },
];

function Accordion() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            {accordionData.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isActive={activeIndex === index}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;

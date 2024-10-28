import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import PageHeader from '../../components/PageHeader';

import { GlobalStyles } from '../../styles/Colours';
import Icon from '../../components/Icon';

const data = [
    { id: '0', q: 'Flexper nedir?', a: 'Flexper, yenilikçi mobilite çözümleri geliştirmek amacıyla çok alternatifli ve müşteri merkezli yeni bir abonelik hizmeti olarak faaliyete girmiş bir projedir. Daha fazla bilgi için Biz Kimiz? sayfasını ziyaret edebilirsiniz.' },
    { id: '1', q: 'Araç aboneliği nedir?', a: 'Araç aboneliği, araç ihtiyacınızı karşılamak için üretilen alternatif bir iş modelidir. Son zamanlarda popülerleşen abonelik hizmetlerinin en çok dikkat çeken örneklerinden birisi olan araç aboneliği bireysel kullanıcılara büyük avantajlar sağlıyor. Ayrıntılı bilgi için araç aboneliği nedir?' },
    { id: '2', q: 'Nasıl abone olurum?', a: 'Flexper sitemizi inceledikten sonra bir araç seçin. Sonrasında bize talebinizi Bilgi İletişim ve Talep Formumuz ile iletin. Biz size ulaşalım ve ayrıntıları konuşalım. Not: Dilerseniz bu formu sadece bilgi sahibi olmak için de kullanabilirsiniz.' },
    { id: '3', q: 'Abonelik sistemine giriş ücreti var mı?', a: 'Sisteme giriş esnasında depozito amaçlı 1 aylık kira bedeli talep edilmekte olup abonelik dönemi sonunda bu bedel kullanıcıya gerekli şartların sağlanması durumunda iade edilmektedir.' },
    { id: '4', q: 'Abonelik için gerkli ön şartlar nelerdir?', a: '25 yaş ve üzerinde olmak 3 yıl ve üzeri T.C., AB veya uluslararası geçerliliği olan B tipi (veya üzeri) bir ehliyete sahip olmak' },
    { id: '5', q: 'Aylık abonelik ücretini nasıl ödeyeceğim?', a: 'Projemiz kapsamında anlaşmalı olduğumuz banka güvencesiyle ödemelerinizi gerçekleştirebilirsiniz. Ayrıntılı bilgi için bizimle irtibata geçebilirsiniz.' },
    { id: '6', q: 'Aile paketi nedir?', a: 'Flexper’da artık seçmiş olduğunuz aracı ailenizle birlikte kullanabilirsiniz! Aylık sadece 699 TL+KDV/Birey ödeyerek dilediğiniz aile bireyini araca ek kullanıcı olarak tanımlayabilir ve sizin aracı kullanmadığınız zamanlarda aile bireylerinizin mobilite ihtiyacını karşılayabilirsiniz. Ek Kullanıcı olarak sadece siz ile aynı adreste ikamet eden birinci derece yakınlarınızı(anne-baba-kardeş-eş-çocuk) tanımlayabilirsiniz. Ayrıntılı bilgi için bizimle iletişime geçin!' },
    { id: '7', q: 'Size nasıl ulaşabilirim?', a: 'İletişim sayfamız üzerinden bilgi ve talep formumuzu doldurmanız yeterli. Ekip arkadaşlarımız en kısa sürede tarafınıza ulaşıp ayrıntılı bilgi veriyor olacaklar. Whatsapp ve  İletişim hattımız: +90 543 353 97 37 E-Posta adresimiz: info@flexper.com.tr' },
    { id: '8', q: 'Aradığım sorunun yanıtını bulamadım. Bana yardımcı olur musunuz?', a: 'Abonelik sistemimiz hakkında genel bilgi sahibi olmak için ana sayfamızı flexper.com.trinceleyebilirsiniz. Abonelik ile ilgili bilgilere araç aboneliği nedir? blog sayfamızdan ulaşabilirsiniz. Diğer sorularınız için yanıtlara ise Sıkça Sorulan Sorular sayfamız üzerinden ulaşabilirsiniz. Eğer aradığım sorunun yanıtı buralarda yok diyorsanız İletişim sayfamız üzerinden bilgi ve talep formunu doldurabilirsiniz. Arkadaşlarımız kısa süre içersinde size ulaşıp sorularınıza yanıt vereceklerdir.' },
    { id: '9', q: 'Aracımı ücretsiz yıkatabilir miyim?', a: 'İkamet ettiğiniz ildeki tüm Otovınn noktalarında ayda 2 Ücretsiz İç Dış Yıkama temizlik hizmetinden yararlanabilirsiniz.' },
    { id: '10', q: 'Vale hizmeti ücretlere dahil mi?', a: 'Vale hizmetinden ikamet ettiğiniz ildeki tüm valelerden ayda toplam 150 TL’lik limitiniz dahilinde yararlanabilirsiniz. Size bir sürprizimiz var bu hizmetimiz çok yakında şofürlü vale olarak  güncellenecek. Ayrıntılı bilgiyi sisteme dahil olunca tarafınıza iletiyor olacağız.' },
    { id: '11', q: 'Aracımı park etmek için istediğim park yerini kullanabilir miyim?', a: 'Evet, üyeliğiniz kapsamında ayda toplamda 250 TL’lik limitiniz dahilinde bu hizmetten yararlanabilirsiniz. Lütfen fişinizi almayı unutmayın.' },
    { id: '12', q: 'Opet\'ten Otobil ile yakıt nasıl alabilirim?', a: 'Flexper araç aboneliği kapsamında aracınızda Otobil cihazı mevcut olup, dilemeniz durumunda yakıtınızı bu cihaz ile para ödemeden alabilir, ay sonunda abonelik bedelinize ek olarak toplu halde ödemesini Flexper’a yapabilirsiniz.' },
    { id: '13', q: 'Aylık km limiti var mı?', a: 'Evet aylık km limiti bulunmaktadır. Aylık 1500 km kullanım limiti sonrasında her bir km aşımı 4 TL / km olarak ücretlendirilecektir.' },
    { id: '14', q: 'Ekstra aksesuar kiralama seçeneğiniz var mı?', a: 'Kayak Taşıyıcı, Elektrikli Bisiklet ve Bisiklet Taşıyıcı, Çocuk Koltuğu, Port Bagaj, Elektrikli Scooter gibi ürün ve aksesuarları Flexper araç aboneliğiniz kapsamında uygun günlük kira bedelleri ile kiralayabilirsiniz.' },
];

function SSS() {
    const [openItemId, setOpenItemId] = useState(null);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleOpenItem(item.id)}>
                <View style={styles.icon}>
                    <Icon name={'caret-down-outline'} size={20} color={GlobalStyles.colours.red700} />
                    <Text style={styles.question}>{item.q}</Text>
                </View>
                {openItemId === item.id && <Text style={styles.answer}>{item.a}</Text>}
            </TouchableOpacity>
        </View>
    );

    const toggleOpenItem = (id) => {
        setOpenItemId(id === openItemId ? null : id);
    };

    return (
        <>
            <PageHeader title={'Sıkça Sorulan Sorular'} />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 110,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: GlobalStyles.colours.black,
        paddingLeft: 5,
    },
    answer: {
        fontSize: 16,
        textAlign: 'justify',
        padding: 8,
        color: GlobalStyles.colours.black,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SSS;

import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import PageHeader from '../../components/PageHeader';

import { GlobalStyles } from '../../styles/Colours';

const windowWidth = Dimensions.get('window').width;

function AboutUs() {
    return (
        <>
            <PageHeader title={'Hakkımızda'} />
            <Text style={{textAlign: 'center'}}> will be improved maybe background image</Text>
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.story}>
                        <Text style={styles.storyHeader}>Flexper'ın Hikayesi</Text>
                        <Text style={styles.storyContent}>Flexper, yenilikçi mobilite çözümleri geliştirmek amacıyla çok alternatifli ve müşteri merkezli yeni bir abonelik hizmeti olarak Gembox A.Ş altında faaliyete girmiş bir projedir. Flexper araç aboneliği, ihtiyacınız olabilecek tüm hizmetlerin bir arada olduğu yeni bir araç kiralama şeklidir.</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.mission}>
                            <Text style={styles.missionHeader}>Misyonumuz</Text>
                            <Text style={styles.missionContent}>Müşterilerimizin mobilite ihtiyaçlarına esnek, kapsayıcı ve çok alternatifli çözümler geliştirerek abonelik sistemİni ülkemize tanıtmak.</Text>
                        </View>
                        <View style={styles.vision}>
                            <Text style={styles.visionHeader}>Vizyonumuz</Text>
                            <Text style={styles.visionContent}>Ülkemizde araç kiralama ekosisteminde yer alacak abonelik sisteminin öncü ve en büyük temsilcisi olmak.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: 20,
    },
    story: {
        marginVertical: 20,
        width: '90%',
    },
    storyHeader: {
        textAlign: 'center',
        fontSize: 42,
        color: GlobalStyles.colours.black,
        fontWeight: '800',
    },
    storyContent: {
        fontSize: 16,
        textAlign: 'justify',
        color: GlobalStyles.colours.black,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        paddingVertical: 50,
    },
    mission: {
        width: windowWidth > 600 ? '45%' : '100%',
        padding: 15,
    },
    missionHeader: {
        color: GlobalStyles.colours.black,
        fontSize: 26,
        textAlign: 'right',
        fontWeight: '800',
    },
    missionContent: {
        color: GlobalStyles.colours.black,
        textAlign: 'right',
        fontSize: 16,
    },
    vision: {
        width: windowWidth > 600 ? '45%' : '100%',
        padding: 15,
    },
    visionHeader: {
        color: GlobalStyles.colours.black,
        fontSize: 26,
        textAlign: 'left',
        fontWeight: '800',
    },
    visionContent: {
        color: GlobalStyles.colours.black,
        textAlign: 'left',
        fontSize: 16,
    },
});

export default AboutUs;

import React from 'react'
import styles from './styles.module.css'
import ServiceCard from './ServiceCard/ServiceCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faGasPump, faHandSparkles, faKey, faParking, faRoad } from '@fortawesome/free-solid-svg-icons'
function ServicesContainer() {
    return (
        <>
            <div className='container mt-5 pt-5 '>
                <div className='row'>
                    <div className='col-4 d-flex '>
                        <ServiceCard HeaderTxt='Ücretsiz Araç Yıkama' Icon={faCar}
                            ParagraphTxt='İkamet ettiğiniz ildeki tüm Otovınn noktlarında ayda 2 Ücretsiz iç-dış yıkama temizlik hizmetinden yararlanabilirsiniz.' />
                    </div>
                    <div className='col-4 d-flex '>
                        <ServiceCard HeaderTxt='Otobil ile Yakıt alma imkanı' Icon={faGasPump}
                            ParagraphTxt='Flexper araç aboneliği kapsamında aracınızda Otobil cihazı mevcut olup, dilemeniz durumunda yakıtınızı bu cihaz ile para ödemeden alabilir, ay sonunda abonelik bedelinize ek olarak toplu halde ödemesini Flexper`a yapabilirsiniz.' />
                    </div>

                    <div className='col-4  d-flex '>
                        <ServiceCard HeaderTxt='Ücretsiz Otopark' Icon={faParking} ParagraphTxt='Üyeliğiniz kapsamında ayda toplamda 300 TL`lik limitiniz dahilinde yararlanabilirsiniz.' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 d-flex '>
                        <ServiceCard HeaderTxt='Ücretsiz Vale' Icon={faHandSparkles} ParagraphTxt='İkamet ettiğiniz ildeki tüm valelerden 300 TL`lik  limitiniz dahilinde yararlanabilirsiniz.' />
                    </div>
                    <div className='col-4 d-flex '>
                        <ServiceCard HeaderTxt='Kapıya Hizmet' Icon={faKey} ParagraphTxt='Size özel olarak sunulan hizmetimiz sayesinde, aracınız kapınıza teslim edilir.' />
                    </div>
                    <div className='col-4 d-flex '>
                        <ServiceCard HeaderTxt='HGS Sistemleri' Icon={faRoad} ParagraphTxt='Araçlarımız, HGS ve OGS sistemlerini kullanarak geçiş noktalarında sorunsuz bir şekilde kullanılabilir.' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesContainer
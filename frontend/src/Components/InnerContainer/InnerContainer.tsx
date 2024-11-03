import React from 'react'
import style from './styles.module.css'
import LandingContainer from '../LandingContainer/LandingContainer'
import WhyInfo from '../WhyInfo/WhyInfo'
import images from '../../assets/images/WhyImages/images';
import ServicesContainer from '../ServicesContainer/ServicesContainer';
import Slider from '../Slider/Slider';



function InnerContainer() {
  return (
    <div className={`${style.innerContainerSizing} pt-5`}>
      <LandingContainer />
      <WhyInfo ImgURL={images.img1} Header='Neden Flexper ?' InfoBars={[
        { HTitle: "Esnek Paketler", PTitle: "6 ve 9 aylık esnek abonelik paketlerimiz ile dilediğiniz zaman aracınızı ve abonelik paketinizi değiştirebilirsiniz. 2 yıllık bağlayıcı sözleşmelere veda edin!" },
        { HTitle: "Müşteri Memnuniyeti", PTitle: "Müşteri merkezli hizmet politikamız ile %100 müşteri memnuniyeti sunuyoruz. Her müşterimize özel birebir hizmet!" },
        { HTitle: "Sürpriz Masraf Yok", PTitle: "İhtiyacınız olabilecek her hizmet için sabit aylık bir ücret ödersiniz. Herhangi bir ek ücrete yada sürprize son!" }
      ]} Align={false} />

      <WhyInfo ImgURL={images.img2} InfoBars={[
        { HTitle: "Özgürlük ve Rahatlık", PTitle: "Karmaşık prosedürlerle uğraşmadan araç sahibi olmanın keyfini çıkarın." },
        { HTitle: "Araç Seçeneği", PTitle: "İstediğiniz araç modelini seçme özgürlüğüne sahip olun." },
        { HTitle: "Her Şey Dahil Paketler", PTitle: "Kapsamlı paket seçeneklerimiz arasından isteğinize uygun olanı seçin." }
      ]} Align={true} />
      <ServicesContainer />
      <Slider />

    </div>
  )
}

export default InnerContainer
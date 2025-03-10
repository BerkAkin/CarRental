import React from 'react'
import styles from './styles.module.css'
import Image from '../Image/Image';
import ListComponent from './List/ListComponent';

function Footer() {

  const contactItems = [
    { Text: "empty", Href: "mailto:empty" },
    { Text: "emptyPhoneNumber", Href: "" },
    { Text: "WhatsApp", Href: "" },
    { Text: "Aydınlatma Metni", Href: "PPInfo" }
  ];

  const aboutItems = [
    { Text: "Flexper Nedir?", Href: "FAQ" },
    { Text: "Araç Aboneliği Nedir?", Href: "FAQ" },
    { Text: "Nasıl Abone Olurum?", Href: "FAQ" },
    { Text: "Aile Paketi Nedir?", Href: "FAQ" },
    { Text: "Abonelik Şartları Nelerdir?", Href: "FAQ" },
  ];

  const companyItems = [
    { Text: "Biz Kimiz?", Href: "About" },
    { Text: "Blog", Href: "Flexblog" },
    { Text: "Müşteri Görüşleri", Href: "About" },
    { Text: "İletişim", Href: "Contact" },
  ];

  const socialItems = [
    { Text: "Instagram", Href: "" },
    { Text: "Facebook", Href: "" },
    { Text: "Youtube", Href: "" },
    { Text: "X", Href: "" },
  ];

  return (
    <>
      <div className=''></div>
      <div className={`${styles.footerBg}  pt-5 container-fluid`}>
        <footer className="container py-5 bg-light">
          <div className='row mb-5'>
            <div className='col-md-3 col-12 justify-content-center d-flex '>
              <Image URL={process.env.REACT_APP_STATIC_IMAGE + "logo.png"} Width="200" Height="50" />
            </div>
          </div>
          <div className='row text-center'>
            <ListComponent Title="İletişim" Items={contactItems} />
            <ListComponent Title="Sık Sorulan Sorular" Items={aboutItems} />
            <ListComponent Title="Hakkımızda" Items={companyItems} />
            <ListComponent Title="Sosyal Medyada Biz" Items={socialItems} />
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer
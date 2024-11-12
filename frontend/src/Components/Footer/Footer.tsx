import React from 'react'
import styles from './styles.module.css'
import Image from '../Image/Image';
import logo from '../../assets/logos/logo-flexper.png'
import ListComponent from './List/ListComponent';

function Footer() {

  const contactItems = [
    { Text: "info@flexper.com.tr", Href: "mailto:info@flexper.com.tr" },
    { Text: "+90 543 353 97 37", Href: "" },
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
      <div className='mt-5 pt-5'></div>
      <div className={`${styles.footerBg} mt-5 pt-5 container-fluid`}>
        <footer className="container py-5 bg-light rounded-top">
          <div className='row mb-5'>
            <div className='col-3 justify-content-center d-flex '>
              <Image URL={logo} Width="200" Height="50" />
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
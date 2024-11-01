import React from 'react'
import styles from './styles.module.css'
import Image from '../Image/Image';
import logo from '../../assets/logos/logo-flexper.png'
import ListComponent from './List/ListComponent';

function Footer() {

  const contactItems = [
    { Text: "info@flexper.com.tr", Href: "mailto:info@flexper.com.tr" },
    { Text: "+90 543 353 97 37", Href: "" },
    { Text: "WhatsApp", Href: "" }
  ];

  const aboutItems = [
    { Text: "Flexper Nedir?", Href: "" },
    { Text: "Araç Aboneliği Nedir?", Href: "" },
    { Text: "Nasıl Abone Olurum?", Href: "" },
    { Text: "Aile Paketi Nedir?", Href: "" },
    { Text: "Abonelik Şartları Nelerdir?", Href: "" },
  ];

  const companyItems = [
    { Text: "Biz Kimiz?", Href: "" },
    { Text: "Blog", Href: "" },
    { Text: "Neler Söylediler", Href: "" },
    { Text: "İletişim", Href: "" },
  ];

  const socialItems = [
    { Text: "Instagram", Href: "" },
    { Text: "Facebook", Href: "" },
    { Text: "Youtube", Href: "" },
    { Text: "X", Href: "" },
  ];

  return (
    <div className={`${styles.footerBg} mt-5 pt-5 h-100 container-fluid`}>
      <footer className="container py-5 bg-light rounded-top">
        <div className='row mb-5'>
          <div className='col-3 justify-content-center d-flex '>
            <Image URL={logo} Width="200" Height="50" />
          </div>
        </div>
        <div className='row text-center'>
          <ListComponent Title="İletişim" Items={contactItems} />
          <ListComponent Title="Hizmetler" Items={aboutItems} />
          <ListComponent Title="Hakkımızda" Items={companyItems} />
          <ListComponent Title="Sosyal Medyada Biz" Items={socialItems} />
        </div>
      </footer>
    </div>
  );
}

export default Footer
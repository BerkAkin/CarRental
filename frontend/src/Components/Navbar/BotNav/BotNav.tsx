import styles from './styles.module.css'
import ListElement from '../../ListElement/ListElement'
import Image from '../../Image/Image';
import flexperLogo from '../../../assets/logos/logo-flexper.png';
import { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';

interface BotNavProps {
  openModal: (content: 'login' | 'register') => void;
}

function BotNav({ openModal }: BotNavProps) {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    const loggedIn = localStorage.getItem("accessToken");
    setIsLoggedIn(!!loggedIn);
  }, [])


  const logout = async () => {
    try {
      await apiService(endpoints.logout, "GET");
      localStorage.removeItem("accessToken");
      alert("Çıkış Yapıldı");
      window.location.reload();
    }
    catch (error) {
      console.error("Çıkış işlemi sırasında hata:", error);
    }


  }


  return (
    <>
      <div className={`${styles.botNav} ps-2 d-flex justify-content-between container-fluid`}>
        <div className='ms-5 h-100 col-6'>
          <div className='row h-100 d-flex container-fluid '>
            <div className='col-2 align-items-center d-flex  ps-0'>
              <Image URL={flexperLogo} Width="160" Height="40" />
            </div>
            <div className='col-10 d-flex align-items-center justify-content-evenly  text-center'>
              <ListElement color="#1A2B48" text='ANASAYFA' href='' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              <ListElement color="#1A2B48" text='MODELLER' href='Models' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              <ListElement color="#1A2B48" text='FLEXBLOG' href='Blog' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              <ListElement color="#1A2B48" text='SIK SORULAN SORULAR' href='FAQ' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              <ListElement color="#1A2B48" text='BİZ KİMİZ?' href='About' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              <ListElement color="#1A2B48" text='İLETİŞİM' href='Contact' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
            </div>
          </div>
        </div>
        <div className='col-5'>
          <div className='container h-100 d-flex justify-content-end'>
            <div className='row w-100 justify-content-end  text-center'>
              {isLoggedIn ? (
                <>
                  <div className='col-2 align-items-center d-flex justify-content-center'> <button className={`${styles.btns}`}>
                    <ListElement color="#1A2B48" text='PROFİLİM' href='' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
                  </button></div>
                  <div className='col-2 align-items-center d-flex justify-content-center'> <button className={`${styles.btns}`} onClick={logout}> ÇIKIŞ YAP</button></div>

                </>
              ) : (
                <>
                  <div className='col-2 align-items-center d-flex justify-content-center'> <button className={`${styles.btns}`} onClick={() => openModal('register')}> ÜYE OL</button></div>
                  <div className='col-2 align-items-center d-flex justify-content-center'> <button className={`${styles.btns}`} onClick={() => openModal('login')}> GİRİŞ YAP</button></div>

                </>
              )}

            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default BotNav
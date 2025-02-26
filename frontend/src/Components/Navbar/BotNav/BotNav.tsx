import styles from './styles.module.css'
import ListElement from '../../ListElement/ListElement'
import Image from '../../Image/Image';
import { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext';
import { StatusHandler } from '../../../common/StatusHandler';

interface BotNavProps {
  openModal: (content: 'login' | 'register') => void;
}

function BotNav({ openModal }: BotNavProps) {
  const { showToast } = useToastManagerContext();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    const loggedIn = localStorage.getItem("accessToken");
    setIsLoggedIn(!!loggedIn);
  }, [])


  const logout = async () => {
    try {
      const { data, status } = await apiService(endpoints.logout, "GET");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("UserInfo");
      StatusHandler(status, data, showToast)
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    }
    catch (error: any) {
      const { message, status } = error;
      StatusHandler(status, message, showToast)
    }


  }

  return (
    <>
      <nav className={`${styles.botNav} navbar navbar-expand-lg`}>
        <div className="container-fluid">
          <a className="navbar-brand"> <Image URL={"/static/logo.png"} Width="160" Height="40" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-4">
                <ListElement color="#1A2B48" text='ANASAYFA' href='' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              </li>
              <li className="nav-item ms-4">
                <ListElement color="#1A2B48" text='MODELLER' href='Models' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              </li>
              <li className="nav-item ms-4">
                <ListElement color="#1A2B48" text='FLEXBLOG' href='Blog' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              </li>
              <li className="nav-item ms-4">
                <ListElement color="#1A2B48" text='SSS' href='FAQ' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              </li>
              <li className="nav-item ms-4">
                <ListElement color="#1A2B48" text='BİZ KİMİZ?' href='About' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              </li>
              <li className="nav-item ms-4">
                <ListElement color="#1A2B48" text='İLETİŞİM' href='Contact' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isLoggedIn ?
                (
                  <>
                    <li className="nav-item ms-4">
                      <button className={`${styles.btns}`}>
                        <ListElement color="#1A2B48" text='PROFİLİM' href='Profile' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' />
                      </button>
                    </li>
                    <li className="nav-item ms-4">
                      <button className={`${styles.btns}`} onClick={logout}> ÇIKIŞ YAP</button>
                    </li>

                  </>
                ) : (
                  <>
                    <li className="nav-item ms-4">
                      <button className={`${styles.btns}`} onClick={() => openModal('register')}> ÜYE OL</button>
                    </li>
                    <li className="nav-item ms-4">
                      <button className={`${styles.btns}`} onClick={() => openModal('login')}> GİRİŞ YAP</button>
                    </li>

                  </>
                )}

            </ul>
          </div>

        </div>
      </nav>



    </>
  )
}

export default BotNav
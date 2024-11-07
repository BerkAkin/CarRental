import React from 'react'
import styles from './styles.module.css'
import ListElement from '../../ListElement/ListElement'
import Image from '../../Image/Image';
import flexperLogo from '../../../assets/logos/logo-flexper.png';

function BotNav() {
  return (
    <>
      <div className={`${styles.botNav} ps-2 container-fluid`}>
        <div className='ms-5 h-100 col-6 '>
          <div className='row h-100 d-flex container-fluid '>
            <div className='col-2 align-items-center d-flex  ps-0'>
              <Image URL={flexperLogo} Width="160" Height="40" />
            </div>
            <div className='col-10 d-flex align-items-center justify-content-evenly  text-center'>
              <ListElement color="#1A2B48" text='ANASAYFA' href='' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' isHref={true} />
              <ListElement color="#1A2B48" text='MODELLER' href='Models' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' isHref={true} />
              <ListElement color="#1A2B48" text='BİZ KİMİZ?' href='About' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' isHref={true} />
              <ListElement color="#1A2B48" text='SIK SORULAN SORULAR' href='FAQ' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' isHref={true} />
              <ListElement color="#1A2B48" text='İLETİŞİM' href='Contact' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' isHref={true} />
              <ListElement color="#1A2B48" text='BLOG' href='Blog' boldness='700' fs='0.9em' isHover={true} hoverColor='#E00000' isHref={true} />
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default BotNav
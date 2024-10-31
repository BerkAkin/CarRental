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
          <div className=' row h-100 d-flex container-fluid  '>
            <div className='col-2 align-items-center d-flex  ps-0'>
              <Image URL={flexperLogo} Width="160" Height="40" />
            </div>
            <div className='col-9 p-0 d-flex ms-4'>
              <div className='col d-flex align-items-center justify-content-center'>
                <ListElement color="#1A2B48" text='ANASAYFA' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true} />
              </div>
              <div className='col d-flex align-items-center justify-content-center'>
                <ListElement color="#1A2B48" text='MODELLER' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true} />
              </div>
              <div className='col-3 d-flex align-items-center justify-content-center'>
                <ListElement color="#1A2B48" text='SIK SORULAN SORULAR' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true} />
              </div>
              <div className='col d-flex align-items-center justify-content-center'>
                <ListElement color="#1A2B48" text='BİZ KİMİZ?' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true} />
              </div>
              <div className='col d-flex align-items-center justify-content-center'>
                <ListElement color="#1A2B48" text='İLETİŞİM' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BotNav
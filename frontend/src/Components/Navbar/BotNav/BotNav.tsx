import React from 'react'
import styles from './styles.module.css'
import ListElement from '../../ListElement/ListElement'

function BotNav() {
  return (
    <>
    <div className={`${styles.botNav} ps-4 container-fluid`}>
                <div className='ms-5 h-100 col-6 text-center align-items-center'>
                    <div className='m-0 row h-100 d-flex container-fluid  p-0'>
                        <div className='col-2 align-items-center d-flex justify-content-start'>FLEXPER</div>
                        <div className='col-10 p-0 d-flex'>
                            <div className='col d-flex align-items-center justify-content-center'>
                              <ListElement color="#1A2B48" text='ANASAYFA' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true}/>
                              </div>
                              <div className='col d-flex align-items-center justify-content-center'>
                              <ListElement color="#1A2B48" text='MODELLER' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true}/>
                              </div>
                              <div className='col-3 d-flex align-items-center justify-content-center'>
                              <ListElement color="#1A2B48" text='SIK SORULAN SORULAR' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true}/>
                              </div>
                              <div className='col d-flex align-items-center justify-content-center'>
                              <ListElement color="#1A2B48" text='BİZ KİMİZ?' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true}/>
                              </div>
                              <div className='col d-flex align-items-center justify-content-center'>
                              <ListElement color="#1A2B48" text='İLETİŞİM' href='' boldness='700' fs='0.9em' isBold={true} isHover={true} hoverColor='#2C90EC' isHref={true}/>
                              </div>
                        </div>
                    </div>
                </div>
    </div>
    </>
  )
}

export default BotNav
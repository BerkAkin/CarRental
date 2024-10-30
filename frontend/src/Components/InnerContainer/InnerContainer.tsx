import React from 'react'
import style from './styles.module.css'
import LandingContainer from '../LandingContainer/LandingContainer'
import InfoContainer from '../InfoContainer/InfoContainer'

function InnerContainer() {
  return (
    <div className={`${style.innerContainerSizing} pt-5`}>
      <LandingContainer />
      <InfoContainer />
    </div>
  )
}

export default InnerContainer
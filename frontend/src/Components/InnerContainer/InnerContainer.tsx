import React from 'react'
import style from './styles.module.css'
import LandingContainer from '../LandingContainer/LandingContainer'

function InnerContainer() {
  return (
    <div className={`${style.innerContainerSizing}`}>
        <LandingContainer/>
    </div>
  )
}

export default InnerContainer
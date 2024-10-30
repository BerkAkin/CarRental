import React from 'react'
import styles from './styles.module.css'

interface buttonProperties {
  Text: string;
  Color?: string;
  BgColor?: string;
  CrRd?: string;
  Width: string;
  Height: string;
  Padding?: string;
  Border?: string;
}

function Button({ Text, Color, BgColor, CrRd, Width, Height, Padding, Border }: buttonProperties) {
  const btnStyle = {
    '--btn-color': Color ? Color : "#000000",
    '--btn-BgColor': BgColor ? BgColor : "#0373FC",
    '--btn-radius': CrRd ? CrRd : "2px",
    '--btn-wd': Width,
    '--btn-he': Height,
    '--btn-padding': Padding ? Padding : "",
    '--btn-border': Border ? Border : ""
  } as React.CSSProperties;

  return (
    <>
      <button className={styles.ButtonProps} style={btnStyle}>{Text}</button>
    </>
  )
}

export default Button
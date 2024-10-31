import React from 'react'
import styles from "./styles.module.css"

interface ImageParams {
  URL: string;
  Width: string;
  Height: string;
  Alt?: string;
  Round?: boolean;
}

function Image({ URL, Width, Height, Alt, Round }: ImageParams) {
  const ImageProps = {
    "--img-roundness": Round ? "0.5%" : ""
  } as React.CSSProperties;
  return (
    <>
      <img className={styles.roundedImage} style={ImageProps} src={URL} width={Width} height={Height} alt={Alt}></img>
    </>
  )
}

export default Image
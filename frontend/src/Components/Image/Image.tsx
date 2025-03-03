import React from 'react'
import styles from "./styles.module.css"

interface ImageParams {
  URL: string;
  Width?: string;
  Height?: string;
  Alt?: string;
  Round?: boolean;
}

function Image({ URL, Width, Height, Alt, Round }: ImageParams) {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const imageUrl = `${baseUrl}${URL}`;
  const ImageProps = {
    "--img-roundness": Round ? "0.5%" : ""
  } as React.CSSProperties;
  return (
    <>
      <img className={`${styles.roundedImage} img-fluid`} style={ImageProps} src={imageUrl} alt={Alt} loading="lazy"></img>
    </>
  )
}

export default Image
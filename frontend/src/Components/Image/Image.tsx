import React from 'react'
import styles from "./styles.module.css"

interface ImageParams {
  URL: string;
  Width: string;
  Height: string;
  Alt?: string;
}

function Image({ URL, Width, Height, Alt }: ImageParams) {
  return (
    <>
      <img src={URL} width={Width} height={Height} alt={Alt}></img>
    </>
  )
}

export default Image
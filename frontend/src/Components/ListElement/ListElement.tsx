import React from "react";
import styles from "./style.module.css";

interface ListObjectProps {
  text: string;
  href: string;
  isHref: boolean;
  isHover?: boolean;
  hoverColor?: string;
  color: string;
  fs: string;
  boldness?: string;
}

function ListElement({ text, href, isHref, isHover, hoverColor, color, fs, boldness }: ListObjectProps) {
  const linkStyle = {
    "--hover-color": isHover ? hoverColor : {},
    "--default-color": color,
    "--default-ft-size": fs,
    "--default-boldness": boldness
  } as React.CSSProperties;

  return (
    <li className={`list-group-item ${styles.listItem}`}>
      <a className={` ${styles.linkBg}`} href={href} style={linkStyle}>{text}</a>
    </li>
  );
}

export default ListElement;

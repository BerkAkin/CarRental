import React from "react";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import Image from "../Image/Image";



interface ListObjectProps {
  text: string | React.ReactElement<typeof Image> | string[];
  href: string;
  isHover?: boolean;
  hoverColor?: string;
  color?: string;
  fs?: string;
  boldness?: string;
}

function ListElement({ text, href, isHover, hoverColor, color, fs, boldness }: ListObjectProps) {
  const linkStyle = {
    "--hover-color": isHover ? hoverColor : {},
    "--default-color": color,
    "--default-ft-size": fs,
    "--default-boldness": boldness
  } as React.CSSProperties;

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <li onClick={scrollTop} className={`list-group-item ${styles.listItem}`}>
      <NavLink style={linkStyle} className={({ isActive }) => `${styles.linkBg} ${isActive ? styles.activeLink : ""}`} to={`/${href}`}>{text}</NavLink>
    </li>
  );
}

export default ListElement;

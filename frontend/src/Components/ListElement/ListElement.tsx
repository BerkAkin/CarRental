import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

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
      <Link style={linkStyle} className={` ${styles.linkBg}`} to={`/` + href}>{text}</Link>
    </li>
  );
}

export default ListElement;

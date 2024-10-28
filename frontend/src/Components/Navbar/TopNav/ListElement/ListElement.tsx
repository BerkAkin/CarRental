import React from "react";
import styles from "./style.module.css";

interface ListObjectProps {
  text: string;
  href: string;
  isHref: boolean;
}

function ListElement({ text, href, isHref }: ListObjectProps) {
  return (
    <>
      <li className="list-group-item ">
        <a className={`${styles.textSmall} ${styles.linkBg}`} href={href}>
          {text}
        </a>
      </li>
    </>
  );
}

export default ListElement;

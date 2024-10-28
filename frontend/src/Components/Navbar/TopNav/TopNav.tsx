import React from "react";
import styles from "./style.module.css";
import ListElement from "./ListElement/ListElement";

function TopNav() {
  return (
    <>
      <div className={`${styles.navbarBg} container-fluid`}>
        <div className="container pt-2 ms-4">
          <div className="row pt-1 ">
            <ul className="ms-2 d-flex">
              <ListElement
                text="info@flexper.com.tr"
                isHref={true}
                href="mailto:info@flexper.com.tr"
              />{" "}
              <div className="vr ms-4 me-3"></div>
              <ListElement text=" +90 543 353 97 37" isHref={false} href="" />
              <div className="vr ms-3 me-3"></div>
              <ListElement text=" WhatsApp" isHref={false} href="" />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNav;

import React from "react";
import styles from "./style.module.css";
import ListElement from "../../ListElement/ListElement";

function TopNav() {
  return (
    <>
      <div className={`${styles.navbarStyling} container-fluid`}>
        <div className="container pt-2 ms-sm-5 ">
          <div className="row pt-1 ">
            <ul className="ms-sm-2 d-flex">
              <a href="mailto:empty" style={{ color: "white", textDecoration: "none", fontSize: "0.8em", marginTop: "2px" }}>emptyMail</a>
              <div className="vr ms-2 me-2 ms-sm-4 me-sm-3"></div>
              <ListElement text="emptyPhoneNumber" fs="0.8em" boldness="500" href=" " color="white" isHover={false} />
              <div className="vr ms-2 me-2 ms-sm-3 me-sm-3"></div>
              <ListElement text=" WhatsApp" fs="0.8em" boldness="500" href=" " color="white" isHover={false} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNav;

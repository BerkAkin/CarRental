import React from "react";
import "../../app.css";
import TopNav from "../Navbar/TopNav/TopNav";
import BotNav from "../Navbar/BotNav/BotNav";
import InnerContainer from "../InnerContainer/InnerContainer";

function Container() {
  return (
    <div>
      <TopNav />
      <BotNav/>
      <InnerContainer/>
    </div>
  );
}

export default Container;

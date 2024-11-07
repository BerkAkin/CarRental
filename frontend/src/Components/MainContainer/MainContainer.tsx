import React from "react";
import "../../app.css";
import TopNav from "../Navbar/TopNav/TopNav";
import BotNav from "../Navbar/BotNav/BotNav";
import InnerContainer from "../Containers/LandingContainer/LandingContainer";
import Footer from "../Footer/Footer";

function MainContainer() {
  return (
    <div>
      <TopNav />
      <BotNav />
      <InnerContainer />
      <Footer />
    </div>
  );
}

export default MainContainer;

import React from "react";
import "../../app.css";
import TopNav from "../Navbar/TopNav/TopNav";
import BotNav from "../Navbar/BotNav/BotNav";
import LandingContainer from "../Containers/LandingContainer/LandingContainer";
import Footer from "../Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModelsContainer from "../Containers/ModelsContainer/ModelsContainer";
import AboutContainer from "../Containers/AboutContainer/AboutContainer";
import FAQContainer from "../Containers/FAQContainer/FAQContainer";
import ContactContainer from "../Containers/ContactContainer/ContactContainer";
import BlogContainer from "../Containers/BlogContainer/BlogContainer";
import DetailContainer from "../Containers/DetailContainer/DetailContainer";

function MainContainer() {
  return (
    <>
      <Router>
        <TopNav />
        <BotNav />
        <Routes>
          <Route path="/" element={<LandingContainer />}></Route>
          <Route path="/Models" element={<ModelsContainer />}></Route>
          <Route path="/Models/:id" element={<DetailContainer />} />
          <Route path="/About" element={<AboutContainer />}></Route>
          <Route path="/FAQ" element={<FAQContainer />}></Route>
          <Route path="/Contact" element={<ContactContainer />}></Route>
          <Route path="/Blog" element={<BlogContainer />}></Route>
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default MainContainer;

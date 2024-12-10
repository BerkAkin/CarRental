import React, { useState } from "react";
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
import PPInfo from "../Containers/ContactContainer/PrivacyPolicyInfo/PPInfo";
import BlogDetailContainer from "../Containers/BlogDetailContainer/BlogDetailContainer";
import UserLogin from "../Containers/UserContainer/Login/UserLogin";
import Modal from "../Modal/Modal";
import UserRegister from "../Containers/UserContainer/Register/UserRegister";
import UserProfile from "../Containers/UserProfileContainer/UserProfile";

function MainContainer() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'login' | 'register'>();

  const openModal = (content: 'login' | 'register') => {
    setModalContent(content);
    setIsModalOpen(true);
  }

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Router>
        <TopNav />
        <BotNav openModal={openModal} />

        {
          isModalOpen ?
            <Modal closeModal={closeModal} >
              {modalContent == 'login' ? <UserLogin /> : <UserRegister />}
            </Modal> : ""
        }
        <Routes>
          <Route path="/" element={<LandingContainer />}></Route>
          <Route path="/Models" element={<ModelsContainer />}></Route>
          <Route path="/Models/:id" element={<DetailContainer />} />
          <Route path="/About" element={<AboutContainer />}></Route>
          <Route path="/FAQ" element={<FAQContainer />}></Route>
          <Route path="/Contact" element={<ContactContainer />}></Route>
          <Route path="/Blog" element={<BlogContainer />}></Route>
          <Route path="/Blog/:id" element={<BlogDetailContainer />}></Route>
          <Route path="/PPInfo" element={<PPInfo />}></Route>
          <Route path="/Profile" element={<UserProfile />}></Route>
        </Routes>


        <Footer />
      </Router>
    </>
  );
}

export default MainContainer;

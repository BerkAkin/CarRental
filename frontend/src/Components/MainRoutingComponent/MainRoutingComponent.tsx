import React, { useState } from "react";
import "../../app.css";
import TopNav from "../Navbar/TopNav/TopNav";
import BotNav from "../Navbar/BotNav/BotNav";
import Footer from "../Footer/Footer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DetailContainer from "../../Pages/ModelDetailPage/ModelDetailPage";
import Modal from "../Modal/Modal";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";
import AboutPage from "../../Pages/AboutPage/AboutPage";
import FAQPage from "../../Pages/FAQPage/FAQPage";
import PrivacyPolicyPage from "../../Pages/PrivacyPolicyPage/PrivacyPolicyPage";
import ContactPage from "../../Pages/ContactPage/ContactPage";
import ModelsPage from "../../Pages/ModelsPage/ModelsPage";
import BlogPage from "../../Pages/BlogPage/BlogPage";
import BlogDetailPage from "../../Pages/BlogDetailPage/BlogDetailPage";
import LandingPage from "../../Pages/LandingPage/LandingPage";
import LoginComponent from "../LoginComponent/LoginComponent";
import RegisterComponent from "../RegisterComponent/RegisterComponent";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import ResetPasswordPage from "../../Pages/ResetPasswordPage/ResetPasswordPage";

function MainRoutingComponent() {


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
              {modalContent == 'login' ? <LoginComponent /> : <RegisterComponent />}
            </Modal> : ""
        }

        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/Models" element={<ModelsPage />}></Route>
          <Route path="/Models/:id" element={<DetailContainer />} />
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/FAQ" element={<FAQPage />}></Route>
          <Route path="/Contact" element={<ContactPage />}></Route>
          <Route path="/Blog" element={<BlogPage />}></Route>
          <Route path="/Blog/:id" element={<BlogDetailPage />}></Route>
          <Route path="/PPInfo" element={<PrivacyPolicyPage />}></Route>
          <Route path="/Profile" element={<ProfilePage />}></Route>
          <Route path="/resetPassword" element={<ResetPasswordPage />}></Route>
          <Route path="*" element={<ErrorPage ErrorMessage="Gidilmek istenen sayfa mevcut değil" />} />
        </Routes>

        <Footer />
      </Router >
    </>
  );
}

export default MainRoutingComponent;

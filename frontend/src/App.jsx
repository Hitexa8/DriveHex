import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import LoginPage from './Authentication/Login1'
import RegisterPage from "./Authentication/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import CustomerDetails from "./components/CustomerDetails";
import ResetPassword from "./components/ResetPassword";
import ActivatePage from "./Authentication/ActivatePage";


function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/reset-password';
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<CustomerDetails />} />
        <Route path="reset-password" element={<ResetPassword/>}/>
        <Route path="/activate/:uid/:token" element={<ActivatePage />} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

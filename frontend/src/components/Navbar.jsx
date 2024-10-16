import Logo from "../images/logo/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout, reset } from "../features/auth/authSlice";
import '../dist/styles.css'


function Navbar() {
  const [nav, setNav] = useState(false);
  const openNav = () => {
    setNav(!nav);
  };

  const user = localStorage.getItem("user");
  if(user){
    const access = JSON.parse(user)['access']
    const user_id = jwtDecode(access)['user_id']
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <nav>
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">

             {user ? (
                  <>
                   <Link to="/profile" className="fa fa-user fa-2x">
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="navbar__buttons__logout" 
                    >
                      SignOut
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="navbar__buttons__sign-in">
                      Sign In
                    </Link>
                    <Link to="/register" className="navbar__buttons__register" >
                      Register
                    </Link>
                  </>
                )}
          </div>
          
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
              <li>
                <span>CAR</span> Rental
              </li>
              <li>
                We offers a big range of vehicles for all your driving needs. We
                have the perfect car to meet your needs.
              </li>
              <li>
                <a href="tel:123456789">
                  <i className="fa-solid fa-phone"></i> &nbsp; (123) -456-789
                </a>
              </li>

              <li>
                <a
                  href="mailto: 
                carrental@gmail.com"
                >
                  <i className="fa-solid fa-envelope"></i>
                  &nbsp; carrental@xyz.com
                </a>
              </li>

          
            </ul>

            <ul className="footer-content__2">
              <li>Company</li>
              <li>
                <a href="#home">Gallery</a>
              </li>
              <li>
                <a href="#home">Careers</a>
              </li>
              <li>
                <a href="#home">Mobile</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
              <li>
                <a href="#home">How we work</a>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>Working Hours</li>
              <li>Mon - Fri: 9:00AM - 9:00PM</li>
              <li>Sat: 9:00AM - 19:00PM</li>
              <li>Sun: Closed</li>
            </ul>

            <ul className="footer-content__2">
              <li>Subscription</li>
              <li>
                <p>Subscribe your Email address for latest news & updates.</p>
              </li>
              <li>
              <div style={{ position: "relative", display: "inline-block" }}>
                <i className="fa-solid fa-envelope" 
                   style={{ position: "absolute", left: "10px", top: "60%", transform: "translateY(-50%)", color: "#3A3A3A" }}>
                </i>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  style={{ paddingLeft: "40px", height: "40px" }}
                  className="form-control"
                />
                </div>
              </li>
              <li>
                <button className="submit-email">Submit</button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

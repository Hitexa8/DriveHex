// // red theme
// // import "../../css/loginPage.css";
// // import React from "react";
// // import * as Components from "../React UI/Components";

// // function Login() {
// //   const [signIn, toggle] = React.useState(true);
// //   return (
// //     <div className="div-parent">
// //       <Components.Container>
// //         <Components.SignUpContainer signinIn={signIn}>
// //           <Components.Form>
// //             <Components.Title>Create Account</Components.Title>
// //             <Components.Input type="text" placeholder="Name" />
// //             <Components.Input type="email" placeholder="Email" />
// //             <Components.Input type="password" placeholder="Password" />
// //             <Components.Button>Sign Up</Components.Button>
// //           </Components.Form>
// //         </Components.SignUpContainer>

// //         <Components.SignInContainer signinIn={signIn}>
// //           <Components.Form>
// //             <Components.Title>Sign in</Components.Title>
// //             <Components.Input type="email" placeholder="Email" />
// //             <Components.Input type="password" placeholder="Password" />
// //             <Components.Anchor href="#">
// //               Forgot your password?
// //             </Components.Anchor>
// //             <Components.Button>Sigin In</Components.Button>
// //           </Components.Form>
// //         </Components.SignInContainer>

// //         <Components.OverlayContainer signinIn={signIn}>
// //           <Components.Overlay signinIn={signIn}>
// //             <Components.LeftOverlayPanel signinIn={signIn}>
// //               <Components.Title>Welcome Back!</Components.Title>
// //               <Components.Paragraph>
// //                 To keep connected with us please login with your personal info
// //               </Components.Paragraph>
// //               <Components.GhostButton onClick={() => toggle(true)}>
// //                 Sign In
// //               </Components.GhostButton>
// //             </Components.LeftOverlayPanel>

// //             <Components.RightOverlayPanel signinIn={signIn}>
// //               <Components.Title>Hello, Friend!</Components.Title>
// //               <Components.Paragraph>
// //                 Enter Your personal details and start journey with us
// //               </Components.Paragraph>
// //               <Components.GhostButton onClick={() => toggle(false)}>
// //                 Sigin Up
// //               </Components.GhostButton>
// //             </Components.RightOverlayPanel>
// //           </Components.Overlay>
// //         </Components.OverlayContainer>
// //       </Components.Container>
// //     </div>
// //   );
// // }

// // export default Login;

// // blue theme
// import React, { useState } from "react";
// import "../../css/loginPage.css";

// function LoginApp() {
//   // State to track if the user is in sign-up mode
//   const [isSignUpMode, setIsSignUpMode] = useState(false);

//   // Handlers for switching between modes
//   const handleSignUpClick = () => {
//     setIsSignUpMode(true);
//   };

//   const handleSignInClick = () => {
//     setIsSignUpMode(false);
//   };

//   return (
//     <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
//       <div className="forms-container">
//         <div className="signin-signup">
//           {/* Sign-in form */}
//           <form action="#" className="sign-in-form">
//             <h2 className="title">Sign in</h2>
//             <div className="input-field">
//               <i className="fas fa-user" />
//               <input type="text" placeholder="Username" />
//             </div>
//             <div className="input-field">
//               <i className="fas fa-lock" />
//               <input type="password" placeholder="Password" />
//             </div>
//             <input type="submit" value="Login" className="btn solid" />
//           </form>

//           {/* Sign-up form */}
//           <form action="#" className="sign-up-form">
//             <h2 className="title">Sign up</h2>
//             <div className="input-field">
//               <i className="fas fa-user" />
//               <input type="text" placeholder="Username" />
//             </div>
//             <div className="input-field">
//               <i className="fas fa-envelope" />
//               <input type="email" placeholder="Email" />
//             </div>
//             <div className="input-field">
//               <i className="fas fa-lock" />
//               <input type="password" placeholder="Password" />
//             </div>
//             <input type="submit" className="btn" value="Sign up" />
//           </form>
//         </div>
//       </div>

//       {/* Panels for switching modes */}
//       <div className="panels-container">
//         <div className="panel left-panel">
//           <div className="content">
//             <h3>New here?</h3>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
//               ex ratione. Aliquid!
//             </p>
//             <button className="btn transparent" onClick={handleSignUpClick}>
//               Sign up
//             </button>
//           </div>
//           <img src="img/log.svg" className="image" alt="" />
//         </div>
//         <div className="panel right-panel">
//           <div className="content">
//             <h3>One of us?</h3>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
//               laboriosam ad deleniti.
//             </p>
//             <button className="btn transparent" onClick={handleSignInClick}>
//               Sign in
//             </button>
//           </div>
//           <img src="img/register.svg" className="image" alt="" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginApp;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "../../css/loginPage.css";

function Login() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [isForgetPasswordMode, setIsForgetPasswordMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
    setIsForgetPasswordMode(false);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
    setIsForgetPasswordMode(false);
  };

  const handleForgetPasswordClick = () => {
    setIsForgetPasswordMode(true);
  };

  const [regData, setRegData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password, re_password } = regData;
  // const { email, password } = formData

  const handleSignUpChange = (e) => {
    setRegData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== re_password) {
      toast.error("Passwords donot match.");
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        password,
        re_password,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      navigate("/");
      toast.success(
        "An activation email has been sent to your email. Please check your email"
      );
    }

    dispatch(reset());
  }, [isError, isSuccess, user, dispatch]);

  return (
    <div className={`container1 ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign-in form */}
          {!isForgetPasswordMode && (
            <form action="#" className="sign-in-form form-demo">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className="btn-c solid" />
              <p
                className="forgot-password"
                onClick={handleForgetPasswordClick}
              >
                Forgot your password?
              </p>
            </form>
          )}

          {/* Sign-up form */}
          {!isForgetPasswordMode && (
            <form action="#" className="sign-up-form form-demo">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleSignUpChange}
                  value={first_name}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleSignUpChange}
                  value={last_name}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleSignUpChange}
                  value={email}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSignUpChange}
                  value={password}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-key" />
                <input
                  type="password"
                  placeholder="Retype Password"
                  name="re_password"
                  onChange={handleSignUpChange}
                  value={re_password}
                  required
                />
              </div>
              <input
                type="submit"
                className="btn-c"
                value={"Sign up"}
                onClick={handleSubmit}
              />
            </form>
          )}

          {/* Forget Password form */}
          {isForgetPasswordMode && (
            <form action="#" className="forget-password-form form-demo">
              <h2 className="title">Forgot Password</h2>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input type="email" placeholder="Enter your email" />
              </div>
              <input
                type="submit"
                value="Reset Password"
                className="btn-c solid"
              />
              <p className="back-to-signin" onClick={handleSignInClick}>
                Back to Sign in
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Panels for switching modes */}
      {!isForgetPasswordMode && (
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn-c transparent" onClick={handleSignUpClick}>
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn-c transparent" onClick={handleSignInClick}>
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

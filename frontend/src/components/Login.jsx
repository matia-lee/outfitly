import "../static/Login.css";
import { useState } from "react";
import { auth, provider } from "../Firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Hanger from "../icons/Hanger";
import EmailIcon from "../icons/EmailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import ShowPassword from "../icons/ShowPassword";
import HidePassword from "../icons/HidePassword";

const Login = () => {
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [validCredentials, setValidCredentials] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const { signIn } = useAuth();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handlePasswordVisibilityClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("Login data: ", loginEmail, loginPassword);

      await signIn(loginEmail, loginPassword);
      navigate("/homepage");
    } catch (error) {
      console.log("Login error: ", error.message);
      setValidCredentials(false);
    }
  };

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        if (error.code === "auth/cancelled-popup-request") {
          console.log("Sign-in popup was closed before completion.");
        } else {
          console.log("Error: ", error);
        }
      });
  };

  return (
    <div className="login-container">
      <div className="icon" onClick={handleHangerClick}>
        <Hanger className={spin ? "spin-animation" : ""} />
      </div>
      <div className="title">Outfitly</div>
      <h6 className="subtitle">Login</h6>
      <div className="google-login" onClick={handleGoogleAuth}>
        <img
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="google logo"
        />
        <h3>Continue with Google</h3>
      </div>
      <div className="divider">
        <p>or</p>
      </div>
      <div className="enter-login-email">
        <div className={`email-icon ${!validCredentials ? "invalid-email-icon" : ""}`}>
          <EmailIcon />
        </div>
        <input
          className={`email-input ${!validCredentials ? "invalid-email-input" : ""}`}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </div>
      <div className="enter-password">
        <div className={`password-icon ${!validCredentials ? "invalid-password-icon" : ""}`}>
          <PasswordIcon />
        </div>
        <input
          className={`password-input ${!validCredentials ? "invalid-password-input" : ""}`}
          type={passwordVisibility ? "password" : "text"}
          placeholder="Create password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <div
          className={`password-visibility ${!validCredentials ? "invalid-password-visibility" : ""}`}
          onClick={handlePasswordVisibilityClick}
        >
          {passwordVisibility ? <ShowPassword /> : <HidePassword />}
        </div>
        {!validCredentials && (
          <div className="invalid-credentials-message">
            <p>Invalid username or password</p>
          </div>
        )}
      </div>
      <button className="login-button" onClick={login}>
        Login :)
      </button>
    </div>
  );
};

export default Login;

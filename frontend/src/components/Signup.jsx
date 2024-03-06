import { useState } from "react";
import "../static/Signup.css";
import Hanger from "../icons/Hanger";
import ProfileIcon from "../icons/ProfileIcon";
import EmailIcon from "../icons/EmailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import ShowPassword from "../icons/ShowPassword";
import HidePassword from "../icons/HidePassword";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handlePasswordVisibilityClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <div className="signup-container">
      <div className="icon">
        <Hanger />
      </div>
      <div className="title">Outfitly</div>
      <h6 className="subtitle">Create account</h6>
      <div className="create-username">
        <div className="profile-icon">
          <ProfileIcon />
        </div>
        <input
          className="username-input"
          type="text"
          placeholder="Create username"
        />
      </div>
      <div className="enter-email">
        <div className="email-icon">
          <EmailIcon />
        </div>
        <input className="email-input" type="email" placeholder="Enter email" />
      </div>
      <div className="enter-password">
        <div className="password-icon">
          <PasswordIcon />
        </div>
        <input
          className="password-input"
          type= { passwordVisibility ? "password" : "text" }
          placeholder="Enter password"
        />
        <div
          className="password-visibility"
          onClick={handlePasswordVisibilityClick}
        >
          {passwordVisibility ? <ShowPassword /> : <HidePassword />}
        </div>
      </div>
      <button className="signup-button">Sign Up :)</button>
    </div>
  );
};

export default Signup;

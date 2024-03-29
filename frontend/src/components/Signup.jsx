import "../static/Signup.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { useAuth } from "./AuthContext";
import Hanger from "../icons/Hanger";
import ProfileIcon from "../icons/ProfileIcon";
import EmailIcon from "../icons/EmailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import ShowPassword from "../icons/ShowPassword";
import HidePassword from "../icons/HidePassword";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [repeatedUsername, setRepeatedUsername] = useState(true);
  const [repeatedEmail, setRepeatedEmail] = useState(true);
  const [sameEmailError, setSameEmailError] = useState("");
  const [sameUsernameError, setSameUsernameError] = useState("");
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [spin, setSpin] = useState(false);
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const handlePasswordVisibilityClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const validateUniqueness = async (email, username) => {
    return fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username }),
    });
  };

  const signup = async () => {
    setSubmissionAttempted(true);
    let isValid = true;

    const passwordIsValid = signUpPassword.length >= 6;
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail);
    const usernameIsValid = signUpUsername.length > 0;

    if (!passwordIsValid || !emailIsValid || !usernameIsValid) {
      setValidPassword(passwordIsValid);
      setValidEmail(emailIsValid);
      setValidUsername(usernameIsValid);
      isValid = false;
    } else {
      try {
        const unique = await validateUniqueness(signUpEmail, signUpUsername);
        if (!unique.ok) {
          const dataError = await unique.json();
          setSameEmailError("");
          setSameUsernameError("");
          setRepeatedEmail(true);
          setRepeatedUsername(true);

          if (dataError.message.includes("Email")) {
            setSameEmailError(dataError.message);
            setRepeatedEmail(false);
            isValid = false;
          }
          if (dataError.message.includes("Username")) {
            setSameUsernameError(dataError.message);
            setRepeatedUsername(false);
            isValid = false;
          }
        } else {
          setSameEmailError("");
          setSameUsernameError("");
          setRepeatedEmail(true);
          setRepeatedUsername(true);
        }
      } catch (error) {
        console.log("Error validating uniqueness", error);
        isValid = false;
      }
    }

    if (isValid) {
      try {
        await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
        console.log(
          "Signup data: ",
          signUpEmail,
          signUpPassword,
          signUpUsername
        );

        await signIn(signUpEmail, signUpPassword);
        navigate("/homepage");
      } catch (error) {
        console.log("Signup error: ", error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="icon" onClick={handleHangerClick}>
        <Hanger className={spin ? "spin-animation" : ""} />
      </div>
      <div className="title-welcome-page">Outfitly</div>
      <h6 className="subtitle">Create account</h6>
      <div className="create-username">
        <div
          className={`profile-icon ${
            submissionAttempted
              ? validUsername && repeatedUsername
                ? "valid-username-icon"
                : "invalid-username-icon"
              : ""
          }`}
        >
          <ProfileIcon />
        </div>
        <input
          className={`username-input ${
            submissionAttempted
              ? validUsername && repeatedUsername
                ? "valid-username"
                : "invalid-username"
              : ""
          }`}
          type="text"
          placeholder="Create username"
          onChange={(e) => setSignUpUsername(e.target.value)}
        />
      </div>
      {!validUsername && validPassword && validEmail && (
        <div className="error-message">
          <h6>Invalid username</h6>
        </div>
      )}
      {repeatedEmail && !repeatedUsername && (
        <div className="error-message">
          <h6>{sameUsernameError}</h6>
        </div>
      )}
      <div className="enter-email">
        <div
          className={`email-icon ${
            submissionAttempted
              ? validEmail && repeatedEmail
                ? "valid-email-icon"
                : "invalid-email-icon"
              : ""
          }`}
        >
          <EmailIcon />
        </div>
        <input
          className={`email-input ${
            submissionAttempted
              ? validEmail && repeatedEmail
                ? "valid-email"
                : "invalid-email"
              : ""
          }`}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setSignUpEmail(e.target.value)}
        />
      </div>
      {!validEmail && validPassword && validUsername && (
        <div className="error-message">
          <h6>Invalid email</h6>
        </div>
      )}
      {!repeatedEmail && repeatedUsername && (
        <div className="error-message">
          <h6>{sameEmailError}</h6>
        </div>
      )}
      <div className="enter-password">
        <div
          className={`password-icon ${
            submissionAttempted
              ? validPassword
                ? "valid-password-icon"
                : "invalid-password-icon"
              : ""
          }`}
        >
          <PasswordIcon />
        </div>
        <input
          className={`password-input ${
            submissionAttempted
              ? validPassword
                ? "valid-password"
                : "invalid-password"
              : ""
          }`}
          type={passwordVisibility ? "password" : "text"}
          placeholder="Create password"
          onChange={(e) => setSignUpPassword(e.target.value)}
        />
        <div
          className={`password-visibility ${
            submissionAttempted
              ? validPassword
                ? "valid-password-visibility"
                : "invalid-password-visibility"
              : ""
          }`}
          onClick={handlePasswordVisibilityClick}
        >
          {passwordVisibility ? <ShowPassword /> : <HidePassword />}
        </div>
      </div>
      {!validPassword && validEmail && validUsername && (
        <div className="error-message">
          <h6>Password must be at least 6 characters</h6>
        </div>
      )}
      {!validEmail && !validPassword && !validUsername && (
        <div className="error-message-combined">
          <p>Invalid credentials</p>
          <p>Password must be at least 6 characters</p>
        </div>
      )}
      {!validEmail && validPassword && !validUsername && (
        <div className="error-message-combined">
          <p>Invalid credentials</p>
        </div>
      )}
      {validEmail && !validPassword && !validUsername && (
        <div className="error-message-combined">
          <p>Invalid credentials</p>
          <p>Password must be at least 6 characters</p>
        </div>
      )}
      {!validEmail && !validPassword && validUsername && (
        <div className="error-message-combined">
          <p>Invalid credentials</p>
          <p>Password must be at least 6 characters</p>
        </div>
      )}
      {!repeatedUsername && !repeatedEmail && (
        <div className="error-message-combined">
          <p>Username taken</p>
          <p>Email already in use</p>
        </div>
      )}
      <button className="signup-button" onClick={signup}>
        Sign Up :)
      </button>
    </div>
  );
};

export default Signup;

import "../static/WelcomePage.css";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setTimeout(() => {
      navigate("/signup");
    }, 150);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="main-container">
      <h1 className="title-welcome-page">Outfitly</h1>
      <h3 className="catchphrase">Outfits made simply.</h3>
      <button className="signup" onClick={handleSignupClick}>
        Signup to continue
      </button>
      <h4 className="login">
        Already have an account?{" "}
        <span className="login-link" onClick={handleLoginClick}>
          Log in
        </span>
      </h4>
    </div>
  );
};

export default WelcomePage;

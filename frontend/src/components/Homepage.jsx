import "../static/Homepage.css";

const Homepage = () => {
  return (
    <div className="main-container">
      <h1 className="title">Outfitly</h1>
      <h3 className="catchphrase">Outfits made simply.</h3>
      <button className="signup">Signup to continue</button>
      <h4 className="login">
        Already have an account? <span className="login-link">Log in</span>
      </h4>
    </div>
  );
};

export default Homepage;

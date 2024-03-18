import "../static/Discover.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hanger from "../icons/Hanger";

const Discover = () => {
  const [spin, setSpin] = useState(false);

  const navigate = useNavigate();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handleLogoClick = () => {
    navigate("/homepage");
  };

  return (
    <div>
      <div className="navbar">
        <div className="uploadpage-icon" onClick={handleHangerClick}>
          <Hanger className={spin ? "spin-animation" : ""} color="#ff9999" />
        </div>
        <div className="logo">
          <div className="title" onClick={handleLogoClick}>
            Outfitly
          </div>
          <div className="closet-subtitle">Discover</div>
        </div>
      </div>
    </div>
  );
};

export default Discover;

import "../static/Closet.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hanger from "../icons/Hanger";
import ArrowIcon from "../icons/ArrowIcon";
import ClosetClothesIcon from "../icons/ClosetClothesIcon";
import ClosetFitIcon from "../icons/ClosetFitIcon";

const Closet = () => {
  const [spin, setSpin] = useState(false);

  const navigate = useNavigate();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handleLogoClick = () => {
    navigate("/homepage");
  };

  const handleClothesClosetClick = () => {
    setTimeout(() => {
      navigate("/closet/clothes");
    }, 150);
  };

  const handleFitsClosetClick = () => {
    setTimeout(() => {
      navigate("/closet/fits");
    }, 150);
  };

  return (
    <>
      <div className="navbar">
        <div className="uploadpage-icon" onClick={handleHangerClick}>
          <Hanger className={spin ? "spin-animation" : ""} color="#ff9999" />
        </div>
        <div className="logo">
          <div className="title" onClick={handleLogoClick}>
            Outfitly
          </div>
          <div className="closet-subtitle">Closet</div>
        </div>
      </div>
      <div className="options-container">
        <div className="navigate-to-container">
          <h3>Navigate to...</h3>
        </div>
        <div className="closet-options">
          <button
            className="individual-options"
            onClick={handleClothesClosetClick}
          >
            <ClosetClothesIcon className="closet-clothes-icon" />
            <span>Clothes closet</span>
            <ArrowIcon className="arrow-icon" color="#ffeeee" />
          </button>
          <button
            className="individual-options"
            onClick={handleFitsClosetClick}
          >
            <ClosetFitIcon className="closet-fit-icon" />
            <span>Fit closet</span>
            <ArrowIcon className="arrow-icon" color="#ffeeee" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Closet;

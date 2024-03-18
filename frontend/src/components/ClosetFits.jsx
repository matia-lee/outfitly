import "../static/ClosetFits.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hanger from "../icons/Hanger";

const ClosetFits = () => {
  const [spin, setSpin] = useState(false);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handleLogoClick = () => {
    navigate("/closet");
  };

  useEffect(() => {
    fetch("http://localhost:5000/get_fits")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error grabbing images", error));
  }, []);

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
          <div className="closet-subtitle">Fit check!!!</div>
        </div>
      </div>
      <div className="fit-images">
        {images.map((image) => (
          <div className="individual-fit" key={image.id}>
            <img src={image.headwear} alt="headwear" className="fit-item" />
            <img src={image.top} alt="top" className="fit-item" />
            <img src={image.bottom} alt="bottom" className="fit-item" />
            <img src={image.footwear} alt="footwear" className="fit-item" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosetFits;

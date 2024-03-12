import "../static/ClosetClothes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hanger from "../icons/Hanger";
import UploadIcon from "../icons/UploadIcon";

const ClosetClothes = () => {
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

  const handleUploadClick = () => {
    navigate("/upload");
  };

  useEffect(() => {
    fetch("http://localhost:5000/get_clothes")
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
          <div className="closet-subtitle">Clothes closet</div>
        </div>
      </div>
      <div className="clothes-grid">
        <div className="upload-icon-closet" onClick={handleUploadClick}>
          <UploadIcon />
          <h3>Upload</h3>
        </div>
        {images.map((image) => (
          <div className="clothes-container" key={image.id}>
            <img src={image.file_url} alt="user_clothes" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosetClothes;

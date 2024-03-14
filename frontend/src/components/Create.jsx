import "../static/Create.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hanger from "../icons/Hanger";

const Create = () => {
  const [spin, setSpin] = useState(false);
  const [headwear, setHeadwear] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);
  const [footwear, setFootwear] = useState([]);

  const navigate = useNavigate();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handleLogoClick = () => {
    navigate("/closet");
  };

  const fetchImages = (interactionType, setState) => {
    fetch(
      `http://localhost:5000/get_specific_clothes?interaction=${encodeURIComponent(
        interactionType
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setState(data))
      .catch((error) =>
        console.error("Error grabbing specific clothes", error)
      );
  };

  useEffect(() => {
    fetchImages("headwear", setHeadwear);
    fetchImages("top", setTop);
    fetchImages("bottom", setBottom);
    fetchImages("footwear", setFootwear);
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
          <div className="closet-subtitle">Create fits</div>
        </div>
      </div>
      <div className="outfit-column">
        <div className="create-page-headwear">
          {headwear.map((url, index) => (
            <img key={index} src={url} alt="headwear" />
          ))}
        </div>
        <div className="create-page-top">
          {top.map((url, index) => (
            <img key={index} src={url} alt="top" />
          ))}
        </div>
        <div className="create-page-bottom">
          {bottom.map((url, index) => (
            <img key={index} src={url} alt="bottom" />
          ))}
        </div>
        <div className="create-page-footwear">
          {footwear.map((url, index) => (
            <img key={index} src={url} alt="footwear" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Create;

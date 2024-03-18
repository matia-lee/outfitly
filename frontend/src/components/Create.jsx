import "../static/Create.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hanger from "../icons/Hanger";
import NextCreateIcon from "../icons/NextCreateIcon";
import PreviousCreateIcon from "../icons/PreviousCreateIcon";
import DiceIcon from "../icons/DiceIcon";
import BookmarkIcon from "../icons/BookmarkIcon";

const Create = () => {
  const [spin, setSpin] = useState(false);
  const [headwear, setHeadwear] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);
  const [footwear, setFootwear] = useState([]);
  const [headwearIndex, setHeadwearIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [footwearIndex, setFootwearIndex] = useState(0);
  const [saveFit, setSaveFit] = useState(false);
  const [fill, setFill] = useState("none");
  const [fitName, setFitName] = useState("");

  const navigate = useNavigate();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handleLogoClick = () => {
    navigate("/homepage");
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

  const handleNextHeadwearClick = () => {
    setHeadwearIndex((prevIndex) => (prevIndex + 1) % headwear.length);
  };

  const handlePreviousHeadwearClick = () => {
    setHeadwearIndex(
      (prevIndex) => (prevIndex - 1 + headwear.length) % headwear.length
    );
  };

  const handleNextTopClick = () => {
    setTopIndex((prevIndex) => (prevIndex + 1) % top.length);
  };

  const handlePreviousTopClick = () => {
    setTopIndex((prevIndex) => (prevIndex - 1 + top.length) % top.length);
  };

  const handleNextBottomClick = () => {
    setBottomIndex((prevIndex) => (prevIndex + 1) % bottom.length);
  };

  const handlePreviousBottomClick = () => {
    setBottomIndex(
      (prevIndex) => (prevIndex - 1 + bottom.length) % bottom.length
    );
  };

  const handleNextFootwearClick = () => {
    setFootwearIndex((prevIndex) => (prevIndex + 1) % footwear.length);
  };

  const handlePreviousFootwearClick = () => {
    setFootwearIndex(
      (prevIndex) => (prevIndex - 1 + footwear.length) % footwear.length
    );
  };

  const toggleFill = () => {
    setFill(fill === "none" ? "#ffdddd" : "none");
    setSaveFit(true);
  };

  const randomHeadwearIndex = () => {
    if (headwear.length > 0) {
      const randomNumber = Math.floor(Math.random() * headwear.length);
      setHeadwearIndex(randomNumber);
    }
  };

  const randomTopIndex = () => {
    if (top.length > 0) {
      const randomNumber = Math.floor(Math.random() * top.length);
      setTopIndex(randomNumber);
    }
  };

  const randomBottomIndex = () => {
    if (bottom.length > 0) {
      const randomNumber = Math.floor(Math.random() * bottom.length);
      setBottomIndex(randomNumber);
    }
  };

  const randomFootwearIndex = () => {
    if (footwear.length > 0) {
      const randomNumber = Math.floor(Math.random() * footwear.length);
      setFootwearIndex(randomNumber);
    }
  };

  const handleDiceClick = () => {
    randomHeadwearIndex();
    randomTopIndex();
    randomBottomIndex();
    randomFootwearIndex();
  };

  const saveCurrentFits = async () => {
    const outfit = {
      headwear: headwear.length > 0 ? headwear[headwearIndex] : "",
      top: top.length > 0 ? top[topIndex] : "",
      bottom: bottom.length > 0 ? bottom[bottomIndex] : "",
      footwear: footwear.length > 0 ? footwear[footwearIndex] : "",
      fit_name: fitName,
    };

    try {
      const response = await fetch("http://localhost:5000/fit_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(outfit),
      });

      navigate("/closet/fits")

      if (!response.ok) {
        throw new Error("Failed to save outfit");
      }
    } catch (error) {
      console.error("Uh oh fit check gone wrong", error);
    }
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
          <div className="closet-subtitle">Create fits</div>
        </div>
      </div>
      <div className="outfit-column">
        <div className="create-page-headwear">
          {headwear.length === 0 && <div>Upload headwear photos</div>}
          {headwear.length > 0 && (
            <div className="scroll-container">
              <img
                className="headwear-image"
                key={headwearIndex}
                src={headwear[headwearIndex]}
                alt="headwear"
              />
              {headwear.length > 1 && (
                <div className="navigation-buttons">
                  <PreviousCreateIcon
                    onClick={handlePreviousHeadwearClick}
                    className="previous-create-icon"
                  />
                  <NextCreateIcon
                    onClick={handleNextHeadwearClick}
                    className="next-create-icon"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="create-page-top">
          {top.length === 0 && <div>Upload top photos</div>}
          {top.length > 0 && (
            <div className="scroll-container">
              <img
                className="top-image"
                key={topIndex}
                src={top[topIndex]}
                alt="top"
              />
              {top.length > 1 && (
                <div className="navigation-buttons">
                  <PreviousCreateIcon
                    onClick={handlePreviousTopClick}
                    className="previous-create-icon"
                  />
                  <NextCreateIcon
                    onClick={handleNextTopClick}
                    className="next-create-icon"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="create-page-bottom">
          {bottom.length === 0 && <div>Upload bottom photos</div>}
          {bottom.length > 0 && (
            <div className="scroll-container">
              <img
                className="bottom-image"
                key={bottomIndex}
                src={bottom[bottomIndex]}
                alt="bottom"
              />
              {bottom.length > 1 && (
                <div className="navigation-buttons">
                  <PreviousCreateIcon
                    onClick={handlePreviousBottomClick}
                    className="previous-create-icon"
                  />
                  <NextCreateIcon
                    onClick={handleNextBottomClick}
                    className="next-create-icon"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="create-page-footwear">
          {footwear.length === 0 && <div>Upload footwear photos</div>}
          {footwear.length > 0 && (
            <div className="scroll-container">
              <img
                className="footwear-image"
                key={footwearIndex}
                src={footwear[footwearIndex]}
                alt="footwear"
              />
              {footwear.length > 1 && (
                <div className="navigation-buttons">
                  <PreviousCreateIcon
                    onClick={handlePreviousFootwearClick}
                    className="previous-create-icon"
                  />
                  <NextCreateIcon
                    onClick={handleNextFootwearClick}
                    className="next-create-icon"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <DiceIcon className="dice-icon" onClick={handleDiceClick} />
      </div>
      <div>
        <BookmarkIcon
          className="bookmark-icon"
          fill={fill}
          onClick={toggleFill}
        />
      </div>
      {saveFit && (
        <div className="save-fit-overlay">
          <div className="name-fit">
            <p>Name this fit:</p>
            <input
              type="text"
              placeholder="Name"
              className="name-fit-input-box"
              onChange={(e) => setFitName(e.target.value)}
            />
            <button className="save-fit-confirm" onClick={saveCurrentFits}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;

import "../static/ClosetClothes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hanger from "../icons/Hanger";
import UploadIcon from "../icons/UploadIcon";
import CreateIcon from "../icons/CreateIcon";
// import NewestFirstIcon from "../icons/NewestFirstIcon";
import HeadwearFilter from "../icons/HeadwearFilter";
import TopFilterIcon from "../icons/TopFilterIcon";
import BottomFilterIcon from "../icons/BottomFilterIcon";
import FootwearFilterIcon from "../icons/FootwearFilter";

const ClosetClothes = () => {
  const [images, setImages] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const navigate = useNavigate();

  const handleFilterClick = (filterName) => {
    setCurrentFilter((prevFilter) =>
      prevFilter === filterName ? "" : filterName
    );
  };

  useEffect(() => {
    const filterQuery = currentFilter ? `?interaction=${currentFilter}` : "";
    fetch(`http://localhost:5000/get_clothes${filterQuery}`)
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error grabbing images:", error));
  }, [currentFilter]);

  return (
    <div>
      <div className="navbar">
        <div className="uploadpage-icon" onClick={() => navigate("/closet")}>
          <Hanger color="#ff9999" />
        </div>
        <div className="logo" onClick={() => navigate("/closet")}>
          <div className="title">Outfitly</div>
          <div className="closet-subtitle">Clothes closet</div>
        </div>
      </div>
      <div className="filter">
        <h3>Sort by:</h3>
        {/* <div
          className={`newest-filter ${
            currentFilter === "newest" ? "newest-filter-clicked" : ""
          }`}
          onClick={() => handleFilterClick("newest")}
        >
          <NewestFirstIcon className="newest-first-icon" />
          <p>Newest first</p>
        </div> */}
        <div
          className={`headwear-filter ${
            currentFilter === "headwear" ? "headwear-filter-clicked" : ""
          }`}
          onClick={() => handleFilterClick("headwear")}
        >
          <HeadwearFilter className="headwear-filter-icon" />
          <p>Headwear</p>
        </div>
        <div
          className={`top-filter ${
            currentFilter === "top" ? "top-filter-clicked" : ""
          }`}
          onClick={() => handleFilterClick("top")}
        >
          <TopFilterIcon className="top-filter-icon" />
          <p>Top</p>
        </div>
        <div
          className={`bottom-filter ${
            currentFilter === "bottom" ? "bottom-filter-clicked" : ""
          }`}
          onClick={() => handleFilterClick("bottom")}
        >
          <BottomFilterIcon className="bottom-filter-icon" />
          <p>Bottom</p>
        </div>
        <div
          className={`footwear-filter ${
            currentFilter === "footwear" ? "footwear-filter-clicked" : ""
          }`}
          onClick={() => handleFilterClick("footwear")}
        >
          <FootwearFilterIcon className="footwear-filter-icon" />
          <p>Footwear</p>
        </div>
      </div>
      <div className="clothes-grid">
        <div className="upload-icon-closet" onClick={() => navigate("/upload")}>
          <UploadIcon />
          <h3>Upload</h3>
        </div>
        <div className="create-icon-closet" onClick={() => navigate("/create")}>
          <CreateIcon />
          <h3>Create</h3>
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

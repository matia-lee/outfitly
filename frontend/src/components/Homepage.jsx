import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../static/Homepage.css";
import Hanger from "../icons/Hanger";
import UploadIcon from "../icons/UploadIcon";
import CreateIcon from "../icons/CreateIcon";
import ClosetIcon from "../icons/ClosetIcon";
import DiscoverIcon from "../icons/DiscoverIcon";

const Homepage = () => {
  const [spin, setSpin] = useState(false);
  const { username } = useAuth();

  const navigate = useNavigate();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handleCreateClick = () => {
    navigate("/create");
  };

  const handleClosetClick = () => {
    navigate("/closet");
  };

  const handleDiscoverClick = () => {
    navigate("/discover");
  };

  return (
    <>
      <div className="navbar">
        <div className="icon" onClick={handleHangerClick}>
          <Hanger className={spin ? "spin-animation" : ""} color="#ff9999" />
        </div>
        <div className="username">{username}'s closet</div>
      </div>
      <div className="container">
        <div className="options">
          <div className="upload-icon" onClick={handleUploadClick}>
            <UploadIcon />
            <h3>Upload</h3>
          </div>
          <div className="create-icon" onClick={handleCreateClick}>
            <CreateIcon />
            <h3>Create</h3>
          </div>
          <div className="closet-icon" onClick={handleClosetClick}>
            <ClosetIcon />
            <h3>Closet</h3>
          </div>
          <div className="discover-icon" onClick={handleDiscoverClick}>
            <DiscoverIcon />
            <h3>Discover</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

import { useState } from "react";
import { useAuth } from "./AuthContext";
import "../static/Homepage.css";
import Hanger from "../icons/Hanger";
import Upload from "../icons/Upload";
import Create from "../icons/Create";
import ClosetIcon from "../icons/ClosetIcon";
import DiscoverIcon from "../icons/DiscoverIcon";

const Homepage = () => {
  const [spin, setSpin] = useState(false);
  const { username } = useAuth();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  return (
    <>
      <div className="navbar">
        <div className="icon" onClick={handleHangerClick}>
          <Hanger className={spin ? "spin-animation" : ""} color="#ff9999" />
        </div>
        <div className="username">{username}'s closet</div>
      </div>
      <div className="options">
        <Upload className="upload-icon"/>
        <Create className="create-icon"/>
        <ClosetIcon className="closet-icon"/>
        <DiscoverIcon className="discover-icon"/>
      </div>
    </>
  );
};

export default Homepage;

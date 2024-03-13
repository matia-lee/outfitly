import "../static/Upload.css";
import { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Hanger from "../icons/Hanger";
import UploadIcon from "../icons/UploadIcon";
import GarbageIcon from "../icons/GarbageIcon";
import HatIcon from "../icons/HatIcon";
import ShirtIcon from "../icons/ShirtIcon";
import PantsIcon from "../icons/PantsIcon";
import ShoeIcon from "../icons/ShoeIcon";
import CompleteIcon from "../icons/CompleteIcon";
import ExitIcon from "../icons/ExitIcon";

const Upload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [confirmUploadedImage, setConfirmUploadedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interaction, setInteraction] = useState("");
  const [uploadError, setUploadError] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [spin, setSpin] = useState(false);
  const { username } = useAuth();

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleHangerClick = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  const handleBrowseFileClick = () => {
    setTimeout(() => {
      fileInputRef.current.click();
    }, 20);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files[0]);
    }
  }, []);


  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/temporary_upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("File uploaded successfully:", data);
        setConfirmUploadedImage(data.url);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => setIsLoading(false));
  };

  const commitUpload = async (url) => {
    console.log("commitUpload called with URL:", url);
    console.log("Sending to backend:", { url, username, interaction });
    try {
      const response = await validateUpload(url, username, interaction);
      const data = await response.json();
      if (response.ok) {
        navigate("/closet/clothes");
      } else {
        if (data.error.includes("interaction")) {
          console.log("Setting upload error");
          setUploadError(true);
        }
        console.log("Error committing upload:", data.error);
      }
    } catch (error) {
      console.error("Error committing upload", error);
    }
  };

  const validateUpload = async (url, username, interaction) => {
    return fetch("http://localhost:5000/commit_upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, username, interaction }),
    });
  };

  const handleDiscardClick = () => {
    setConfirmUploadedImage("");
  };

  const handleFileSelection = (e) => {
    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      if (file.type !== "image/png") {
        setFileTypeError(true);
        e.target.value = null;
        return;
      }
      handleFileUpload(file);
    }
  };

  const updateInteraction = (newInteraction) => {
    const updatedInteraction =
      interaction === newInteraction ? "" : newInteraction;
    setInteraction(updatedInteraction);
    setUploadError(false);
  };

  const handleLogoClick = () => {
    navigate("/homepage");
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
          <div className="subtitle">Upload images</div>
        </div>
      </div>
      <div
        className={`upload-container ${dragOver ? "drag-over" : ""} ${
          isLoading ? "loading" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <div className="loading-indicator"></div>
        ) : (
          <>
            <UploadIcon size="80px" color="#ff9999" />
            <div className="instructions">
              <h3>Drag files to upload</h3>
              <p>or</p>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileSelection}
              />
              <button
                className="browse-files-button"
                onClick={handleBrowseFileClick}
              >
                Browse files
              </button>
            </div>
          </>
        )}
      </div>
      {confirmUploadedImage && (
        <>
          <div className="complete-overlay">
            <div className="continue-page-image">
              {/* <p className="container-label">Tag image</p> */}
              <img src={confirmUploadedImage} alt="Uploaded" />
              <div className="tagging-options">
                <div
                  className={`headwear ${
                    interaction === "headwear" ? "selected" : ""
                  }`}
                >
                  <HatIcon
                    onClick={() => updateInteraction("headwear")}
                    className={`hat-icon ${
                      interaction === "headwear" ? "selected" : ""
                    }`}
                    color={interaction === "headwear" ? "#ff9999" : "#aaaaaa"}
                  />
                  <p>Headwear</p>
                </div>
                <div
                  className={`top ${interaction === "top" ? "selected" : ""}`}
                >
                  <ShirtIcon
                    onClick={() => updateInteraction("top")}
                    className={`shirt-icon ${
                      interaction === "top" ? "selected" : ""
                    }`}
                    strokeColor={interaction === "top" ? "#ff9999" : "#aaaaaa"}
                  />
                  <p>Top</p>
                </div>
                <div
                  className={`bottom ${
                    interaction === "bottom" ? "selected" : ""
                  }`}
                >
                  <PantsIcon
                    onClick={() => updateInteraction("bottom")}
                    className={`pants-icon ${
                      interaction === "bottom" ? "selected" : ""
                    }`}
                    strokeColor={
                      interaction === "bottom" ? "#ff9999" : "#aaaaaa"
                    }
                  />
                  <p>Bottom</p>
                </div>
                <div
                  className={`footwear ${
                    interaction === "footwear" ? "selected" : ""
                  }`}
                >
                  <ShoeIcon
                    onClick={() => updateInteraction("footwear")}
                    className={`shoe-icon ${
                      interaction === "footwear" ? "selected" : ""
                    }`}
                    strokeColor={
                      interaction === "footwear" ? "#ff9999" : "#aaaaaa"
                    }
                  />
                  <p>Footwear</p>
                </div>
              </div>
              <div className="garbage-icon-text">
                <GarbageIcon
                  className="garbage-icon"
                  onClick={handleDiscardClick}
                />
              </div>
              <div className="complete-icon-text">
                <CompleteIcon
                  className="complete-icon"
                  onClick={() => commitUpload(confirmUploadedImage)}
                />
              </div>
              {uploadError && (
                <div className="error-message">
                  <p className="first-error-line">Uh oh spaghetti o's</p>
                  <p className="second-error-line">Make sure to categorize!!</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {fileTypeError && (
        <div className="file-type-error-overlay">
          <div className="file-type-error">
            <div onClick={() => setFileTypeError(false)}>
              <ExitIcon className="exit-icon" color="#cccccc" />
              <div className="file-type-error-message">
                <p>😧 incorrect file type detected</p>
                <p><span className="png-only">PNG only</span> please!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;

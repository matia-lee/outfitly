import "../static/Upload.css";
import { useCallback, useState, useRef } from "react";
import Hanger from "../icons/Hanger";
import UploadIcon from "../icons/UploadIcon";
import GarbageIcon from "../icons/GarbageIcon";
import NextIcon from "../icons/NextIcon";

const Upload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [confirmUploadedImage, setConfirmUploadedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

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
    // console.log(file);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/upload", {
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

  const handleFileSelection = (e) => {
    const files = e.target.files;
    if (files.length) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="uploadpage-icon">
          <Hanger color="#ff9999" />
        </div>
        <div className="logo">
          <div className="title">Outfitly</div>
          <div className="subtitle">Upload images</div>
        </div>
      </div>
      <div
        className={`upload-container ${dragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <div className="loading-indicator">Uploading...</div> // Display a simple loading text or spinner
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
          <div className="overlay">
            <div className="image-preview">
              <img src={confirmUploadedImage} alt="Uploaded" />
              <div className="garbage-icon-text">
                <GarbageIcon className="garbage-icon" />
                <span className="discard-hover-text">
                  <p>Discard</p>
                </span>
              </div>
              <div className="next-icon-text">
                <NextIcon className="next-icon" />
                <span className="continue-hover-text">
                  <p>Continue</p>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Upload;

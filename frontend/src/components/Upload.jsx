import "../static/Upload.css";
import { useCallback, useState, useRef } from "react";
import Hanger from "../icons/Hanger";
import UploadIcon from "../icons/UploadIcon";

const Upload = () => {
  const [dragOver, setDragOver] = useState(false);
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
    const formData = new FormData();
    formData.append("file", file);

    fetch("/upload", {
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
      })
      .catch((error) => console.error("Error uploading file:", error));
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
        <UploadIcon size="80px" color="#ff9999" />
        <div className="instructions">
          <h3>Drag files to upload</h3>
          <p>or</p>
          <input type="file" style={{ display: "none" }} ref={fileInputRef} />
          <button
            className="browse-files-button"
            onClick={handleBrowseFileClick}
          >
            Browse files
          </button>
        </div>
      </div>
    </>
  );
};

export default Upload;

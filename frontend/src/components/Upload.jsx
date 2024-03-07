import "../static/Upload.css";
import Hanger from "../icons/Hanger";
import UploadIcon from "../icons/UploadIcon";

const Upload = () => {
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
      <div className="upload-container">
        <UploadIcon size="80px" color="#ff9999" />
        <div className="instructions">
          <h3>Drag files to upload</h3>
        </div>
      </div>
    </>
  );
};

export default Upload;

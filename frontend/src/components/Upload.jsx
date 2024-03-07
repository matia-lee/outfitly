import "../static/Upload.css";
import Hanger from "../icons/Hanger";

const Upload = () => {
  return (
    <div className="navbar">
      <div className="uploadpage-icon">
        <Hanger color="#ff9999" />
      </div>
      <div className="logo">
        <div className="title">Outfitly</div>
        <div className="subtitle">Upload images</div>
      </div>
    </div>
  );
};

export default Upload;

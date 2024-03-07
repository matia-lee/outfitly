const CreateIcon = ({ className, style, size = "50px", color = "#9b9b9b" }) => (
  <svg
    className={className}
    style={style}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CreateIcon;

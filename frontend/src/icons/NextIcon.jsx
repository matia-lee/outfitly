const NextIcon = ({ width = "60px", height = "60px", className, onClick }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`next-icon ${className}`}
    onClick={onClick}
  >
    <path
      d="M6 12H18M18 12L13 7M18 12L13 17"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NextIcon;

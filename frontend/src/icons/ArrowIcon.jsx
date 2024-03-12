const ArrowIcon = ({ color = "#000000", className }) => (
  <svg
    width="25px"
    height="25px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className} 
  >
    <path
      d="M6 12H18M18 12L13 7M18 12L13 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;

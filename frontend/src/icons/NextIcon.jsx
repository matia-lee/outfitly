const NextIcon = ({ width = "40px", height = "40px", className }) => (
  <svg
    className={`next-icon ${className}`} // Ensure the class name is applied
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 4V20M4 12H16M16 12L12 8M16 12L12 16"
      stroke="currentColor" // Use currentColor for stroke
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NextIcon;

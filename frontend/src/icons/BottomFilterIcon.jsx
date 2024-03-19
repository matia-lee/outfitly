const BottomFilterIcon = ({ className, onClick, strokeColor = "#aaaaaa" }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="24px"
      height="24px"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M6 36L8.00001 12H40L42 36H26.8421L24 25L21.1579 36H6Z"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 12L27 19"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 12L20 19.5"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BottomFilterIcon;

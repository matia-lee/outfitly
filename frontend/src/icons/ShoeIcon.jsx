const ShoeIcon = ({ className, onClick, strokeColor = "#9b9b9b" }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="33px"
      height="33px"
      viewBox="0 0 24 24"
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.91"
      stroke={strokeColor}
    >
      <path d="M20.59,15.8H3.41A1.91,1.91,0,0,1,1.5,13.89V6.48A1.18,1.18,0,0,1,2.69,5.3h0a1.22,1.22,0,0,1,1,.55C5.16,8,10.09,7.07,10.09,5.3L19.9,9.82a4.49,4.49,0,0,1,2.6,4.07h0A1.91,1.91,0,0,1,20.59,15.8Z" />
      <path d="M22.5,13.89V15.8a3.82,3.82,0,0,1-3.82,3.81H3.41A1.9,1.9,0,0,1,1.5,17.7V13.89" />
      <line x1="9.14" y1="3.39" x2="10.09" y2="5.3" />
      <line x1="12" y1="10.07" x2="13.91" y2="7.2" />
      <line x1="14.86" y1="11.98" x2="16.77" y2="9.11" />
    </svg>
  );
};

export default ShoeIcon;

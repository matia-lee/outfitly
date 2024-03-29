const ClosetFitIcon = ({ className, style, size = "25px", color = "rgba(255, 102, 102, 0.8)" }) => (
    <svg
      className={className}
      style={style}
      fill={color}
      height={size}
      width={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <g>
          <g>
            <path d="M469.333,0H42.667C30.885,0,21.333,9.551,21.333,21.333V448v42.667c0,11.782,9.551,21.333,21.333,21.333 C54.449,512,64,502.449,64,490.667v-21.333h384v21.333c0,11.782,9.551,21.333,21.333,21.333c11.782,0,21.333-9.551,21.333-21.333 V448V21.333C490.667,9.551,481.115,0,469.333,0z M448,426.667H277.333v-384H448V426.667z M64,42.667h170.667v384H64V42.667z" />
            <path d="M170.667,192c-11.782,0-21.333,9.551-21.333,21.333v64c0,11.782,9.551,21.333,21.333,21.333 c11.782,0,21.333-9.551,21.333-21.333v-64C192,201.551,182.449,192,170.667,192z" />
            <path d="M341.333,298.667c11.782,0,21.333-9.551,21.333-21.333v-64c0-11.782-9.551-21.333-21.333-21.333 C329.551,192,320,201.551,320,213.333v64C320,289.115,329.551,298.667,341.333,298.667z" />
          </g>
        </g>
      </g>
    </svg>
  );
  
  export default ClosetFitIcon;
  
import React from "react";

import "./KoFi.css";

interface KoFiProps {
  color: string,
  id: string,
  label: string
}

const KoFi : React.FC<KoFiProps> = ({ color, id, label }) => {
  return (
    <div className="btn-container">
      <a
        title={label}
        className="kofi-button"
        style={{ backgroundColor: color }}
        href={"https://ko-fi.com/" + id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="kofitext">
          <img
            src="https://ko-fi.com/img/cup-border.png"
            className="kofiimg"
            alt="Ko-Fi button"
          />
          {label}
        </span>
      </a>
    </div>
  );
}

export default KoFi;

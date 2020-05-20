import React from "react";

import "./styles.css";

export default function Input(props) {
  return (
    <>
      <div className="input-container">
        <label htmlFor={props.name}>{props.name}</label>
        <div className="input-block">
          <input
            value={props.value}
            onChange={(e) => props.onAction(e.target.value)}
            type="text"
            name={props.name}
            placeholder={props.placeholder}
          />
        </div>
      </div>
    </>
  );
}

import React from "react";

import "./styles.css";

export default function Button(props) {
  return (
    <>
      <div className="button-container">
        <button onClick={() => props.onAction()}>Submit</button>
      </div>
    </>
  );
}

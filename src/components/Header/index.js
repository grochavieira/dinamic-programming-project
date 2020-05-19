import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default function Header(props) {
  return (
    <div className="header-container">
      <ul>
        <li>
          <Link className={`${props.tabOne}`} to="/">
            Troco Mínimo de Moedas
          </Link>
        </li>
        <li>
          <Link className={`${props.tabTwo}`} to="/countsubsets">
            Contagem de subconjuntos
          </Link>
        </li>
        <li>
          <Link className={`${props.tabThree}`} to="/highersumsubsequence">
            Subsequência de maior soma
          </Link>
        </li>
      </ul>
    </div>
  );
}

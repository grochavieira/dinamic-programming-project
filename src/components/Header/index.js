import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default function Header(props) {
  const [on, setOn] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function renderMenu() {
      if (isMenuOpen) {
        setOn("on");
      } else {
        setOn("");
      }
    }

    renderMenu();
  }, [isMenuOpen]);

  return (
    <header>
      <div className="header-container">
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`menu-section ${on}`}
        >
          <div className="menu-toggle">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
          <nav>
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
                <Link className={`${props.tabThree}`} to="/fibonacci">
                  Fibonacci
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import styles from "../../styles/layout/Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFilm, faBookmark, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "../common/DarkModeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <h1>Watch<span  style={{color: "#ffc628"}}>S</span></h1>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <div className={styles.listMenu}>
        <button className={styles.menuToggle} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.show : ""}`}>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/watchlists">
              <FontAwesomeIcon icon={faBookmark} /> <span>watchlist</span>
            </Link>
          </li>
        </ul>

      </div>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;

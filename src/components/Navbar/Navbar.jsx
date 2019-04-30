import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import styles from "./Navbar.module.scss";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {};

    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    return (
      <div className={styles.navbar}>
        <Link to="/">
          <div onClick={this.scrollToTop} className={styles.brand}>
            <h1>Roomify</h1>
          </div>
        </Link>

        <Link to="/login">
          <div className={styles.login_btn}>
            <h2>Login</h2>
          </div>
        </Link>
      </div>
    );
  }
}

export default Navbar;

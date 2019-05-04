import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import firebase from "../Firebase";

import styles from "./Navbar.module.scss";
import { FaUserAlt } from "react-icons/fa";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      loginClass: styles.show,
      profileClass: styles.hide
    };

    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loginClass: styles.hide,
          profileClass: styles.show,
          userId: user.uid
        });
      }
    });
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
        <div className={this.state.loginClass}>
          <Link to="/login">
            <div className={styles.login_btn}>
              <h2>Login</h2>
            </div>
          </Link>
        </div>
        <div className={this.state.profileClass}>
          <Link to={{ pathname: `/user/${this.state.userId}` }}>
            <div className={styles.profile_btn}>
              <FaUserAlt className={styles.profile_icon} />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;

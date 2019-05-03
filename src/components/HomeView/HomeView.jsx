import React, { Component } from "react";

import styles from "./HomeView.module.scss";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import { Link, Element } from "react-scroll";

import { FaChevronCircleDown } from "react-icons/fa";

class HomeView extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: ""
    };

    this.getSearchVal = this.getSearchVal.bind(this);
  }

  getSearchVal(val) {
    this.setState({
      searchValue: val
    });
  }

  render() {
    return (
      <div className={styles.home}>
        <Navbar />
        <div className={styles.jumbotron}>
          <div className={styles.jumbotron_text}>
            <h1>
              Welcome to <div className={styles.brand}>Roomify</div>
            </h1>
            <h2>
              Find or rent out a sublease, find roommates, or browse apartments.
            </h2>
          </div>
          <Link to="search" spy={true} smooth={true} offset={0} duration={500}>
            <div className={styles.down_icon}>
              <FaChevronCircleDown />
            </div>
          </Link>
        </div>
        <Element name="search" className={styles.search_view}>
          <Search onGetSearch={this.getSearchVal} />
        </Element>
      </div>
    );
  }
}

export default HomeView;

import React, { Component } from "react";

import styles from "./DetailView.module.scss";

import { FaBed, FaBath, FaHeart } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";

class DetailView extends Component {
  constructor() {
    super();

    this.state = {
      heartClass: styles.heart
    };
  }

  render() {
    return (
      <div className={styles.detailView}>
        <Navbar />
        <div className={styles.apartment}>
          <div className={styles.apartmentPic}>
            {/* <img src="" alt="apartment" /> */}
          </div>
          <div className={styles.apartmentDescription}>
            <h2 className={styles.apartmentName}>Apartment</h2>
            <h3 className={styles.apartmentAddress}>
              123 Illinois St., Urbana, IL 61801
            </h3>
            <div className={styles.icons}>
              <div className={styles.icon}>
                2<FaBed />
              </div>
              <div className={styles.icon}>
                1<FaBath />
              </div>
            </div>
          </div>
          <div className={this.state.heartClass}>
            <FaHeart onClick={this.heartApartment} />
          </div>
        </div>
      </div>
    );
  }
}

export default DetailView;

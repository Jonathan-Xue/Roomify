import React, { Component } from "react";

import styles from "./ApartmentView.module.scss";

import { FaBed, FaBath, FaHeart } from "react-icons/fa";

class ApartmentView extends Component {
  constructor() {
    super();

    this.state = {
      heartClass: styles.heart
    };

    this.heartApartment = this.heartApartment.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.setState({
        heartClass: styles.red
      });
    }
  }

  heartApartment(event) {
    if (this.props.loggedIn) {
      if (event.target.classList.contains(styles.saved)) {
        event.target.classList.remove(styles.saved);
      } else {
        event.target.classList.add(styles.saved);
      }
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.apartmentView}>
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
      </div>
    );
  }
}

export default ApartmentView;

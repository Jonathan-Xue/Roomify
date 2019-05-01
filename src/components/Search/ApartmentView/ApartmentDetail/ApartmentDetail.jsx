import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./ApartmentDetail.module.scss";

import { FaBed, FaBath, FaHeart } from "react-icons/fa";

class ApartmentDetail extends Component {
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
        <div className={styles.ApartmentDetail}>
          <div className={styles.apartment}>
            <div className={styles.apartmentPic}>
              {/* <img src="" alt="apartment" /> */}
            </div>
            <div className={styles.apartmentDescription}>
              <Link
                to={{
                  pathname: `/apartment/${this.props.id}`,
                  state: {
                    loggedIn: this.props.loggedIn,
                    address: this.props.address,
                    bedrooms: this.props.bedrooms,
                    bathrooms: this.props.bathrooms,
                    start: this.props.start,
                    end: this.props.end,
                    latLong: this.props.latLong,
                    userId: this.props.userId,
                    id: this.props.id
                  }
                }}
              >
                <h2 className={styles.apartmentName}>Apartment</h2>
              </Link>
              <h3 className={styles.apartmentAddress}>{this.props.address}</h3>
              <div className={styles.icons}>
                <div className={styles.icon}>
                  {this.props.bedrooms}
                  <FaBed />
                </div>
                <div className={styles.icon}>
                  {this.props.bathrooms}
                  <FaBath />
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

export default ApartmentDetail;
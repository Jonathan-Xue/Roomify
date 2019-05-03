import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./ApartmentDetail.module.scss";
import { getUser } from "../../../../backend_helper";

import {
  FaBed,
  FaBath,
  FaHeart,
  FaCalendarAlt,
  FaUserAlt
} from "react-icons/fa";

class ApartmentDetail extends Component {
  constructor() {
    super();

    this.state = {
      userName: ""
    };

    this.heartApartment = this.heartApartment.bind(this);
    this.getUserName = this.getUserName.bind(this);
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

  getUserName(id) {
    getUser(id).then(res => {
      return res.data.data.Name;
    });
  }

  render() {
    if (this.props.apartment.StartDate) {
      this.props.apartment.StartDate = new Date(this.props.apartment.StartDate);
    }
    if (this.props.apartment.EndDate) {
      this.props.apartment.EndDate = new Date(this.props.apartment.EndDate);
    }
    return (
      <div className={styles.wrapper}>
        <div className={styles.ApartmentDetail}>
          <div className={styles.apartment}>
            <img className={styles.apartmentPic} src={this.props.apartment.ImageURL} alt="apartment" />

            <div className={styles.apartmentDescription}>
              <Link
                to={{
                  pathname: `/apartment/${this.props.id}`,
                  state: {
                    loggedIn: this.props.loggedIn
                  }
                }}
              >
                <h2 className={styles.apartmentName}>Apartment</h2>
              </Link>
              <h3 className={styles.apartmentAddress}>
                {this.props.apartment.Address}
              </h3>
              <div className={styles.icons}>
                <div className={styles.icon}>
                  {this.props.apartment.Bedrooms}
                  <FaBed />
                </div>
                <div className={styles.icon}>
                  {this.props.apartment.Bathrooms}
                  <FaBath />
                </div>
              </div>
              <div className={styles.availability}>
                <div className={styles.cal}>
                  <FaCalendarAlt />
                </div>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(this.props.apartment.StartDate) +
                  " to " +
                  new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(this.props.apartment.EndDate)}
              </div>
              <div className={styles.user}>
                <div className={styles.userIcon}>
                  <FaUserAlt />
                </div>
                {this.state.userName}
              </div>
            </div>

            <div className={styles.heart}>
              <FaHeart onClick={this.heartApartment} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApartmentDetail;

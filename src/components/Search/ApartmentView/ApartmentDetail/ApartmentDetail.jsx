import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./ApartmentDetail.module.scss";
import {
  getUser,
  addToSavedApts,
  removeFromSavedApts
} from "../../../../backend_helper";
import firebase from "../../../Firebase";

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
      userName: "",
      savedApartments: []
    };

    this.heartApartment = this.heartApartment.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    // Logged In
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this._isMounted && this.setState({ loggedIn: true });
        getUser(user.uid).then(res => {
          this.setState({
            savedApartments: res.data.data.SavedApartments
          });
          if (this.state.savedApartments.includes(this.props.apartment._id)) {
            document
              .getElementById("heart_icon" + this.props.num)
              .classList.add(styles.saved);
          }
        });
      } else {
        this._isMounted && this.setState({ loggedIn: false });
      }
    });

    if (this.props.apartment.UserID) {
      this.getUserName(this.props.apartment.UserID);
    }
  }

  heartApartment(event) {
    if (this.state.loggedIn) {
      var user = firebase.auth().currentUser;
      if (event.currentTarget.classList.contains(styles.saved)) {
        event.currentTarget.classList.remove(styles.saved);
        removeFromSavedApts(this.props.apartment._id, user.uid).then(res => {
          console.log(res);
        });
      } else {
        event.currentTarget.classList.add(styles.saved);
        addToSavedApts(this.props.apartment._id, user.uid).then(res => {
          console.log(res);
        });
      }
    }
  }

  getUserName(id) {
    getUser(id).then(res => {
      this.setState({
        userName: res.data.data.Name
      });
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
            <img
              className={styles.apartmentPic}
              src={this.props.apartment.ImageURL}
              alt="apartment"
            />

            <div className={styles.apartmentDescription}>
              <Link
                to={{
                  pathname: `/apartment/${this.props.id}`
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
              <FaHeart
                id={"heart_icon" + this.props.num}
                onClick={this.heartApartment}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApartmentDetail;

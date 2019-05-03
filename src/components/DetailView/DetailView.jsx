import React, { Component } from "react";

import styles from "./DetailView.module.scss";
import firebase from "../Firebase";

import {
  FaBed,
  FaBath,
  FaHeart,
  FaCalendarAlt,
  FaUserAlt
} from "react-icons/fa";
import Navbar from "../Navbar/Navbar";

import { getApartment, getUser } from "../../backend_helper";

class DetailView extends Component {
  constructor() {
    super();

    this.state = {
      apartment: {},
      userName: ""
    };

    this.heartApartment = this.heartApartment.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      this.setState({ loggedIn: true });
    } else {
      // No user is signed in.
      this.setState({ loggedIn: false });
    }
    getApartment(this.props.match.params.id)
      .then(res => {
        this.setState({
          apartment: res.data.data
        });
        if (this.state.apartment.UserID) {
          this.getUserName(this.state.apartment.UserID);
        }
      })
      .catch(err => {
        this.props.history.push({
          pathname: "/",
          state: {}
        });
      });

    if (this.state.apartment.StartDate) {
      this.setState({
        startDate: new Date(this.state.apartment.StartDate)
      });
    }
    if (this.state.apartment.EndDate) {
      this.setState({
        endDate: new Date(this.state.apartment.EndDate)
      });
    }
  }

  heartApartment(event) {
    if (this.state.loggedIn) {
      if (event.target.classList.contains(styles.saved)) {
        event.target.classList.remove(styles.saved);
      } else {
        event.target.classList.add(styles.saved);
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
    return (
      <div className={styles.detailView}>
        <Navbar />
        <div className={styles.apartment}>
          <img
            className={styles.apartmentPic}
            src={this.state.apartment.ImageURL}
            alt="apartment"
          />

          <div className={styles.apartmentDescription}>
            <h2 className={styles.apartmentName}>Apartment</h2>
            <h3 className={styles.apartmentAddress}>
              {this.state.apartment.Address}
            </h3>
            <div className={styles.icons}>
              <div className={styles.icon}>
                {this.state.apartment.Bedrooms}
                <FaBed />
              </div>
              <div className={styles.icon}>
                {this.state.apartment.Bathrooms}
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
              }).format(this.state.startDate) +
                " to " +
                new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(this.state.endDate)}
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
    );
  }
}

export default DetailView;

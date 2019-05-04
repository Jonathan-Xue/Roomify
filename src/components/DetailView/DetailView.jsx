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

import {
  getApartment,
  getUser,
  addToSavedApts,
  removeFromSavedApts
} from "../../backend_helper";

class DetailView extends Component {
  constructor() {
    super();

    this.state = {
      apartment: {},
      userEmail: "",
      savedApartments: []
    };

    this.heartApartment = this.heartApartment.bind(this);
    this.getUserEmail = this.getUserEmail.bind(this);
  }

  componentDidMount() {
    // Logged In
    var user = firebase.auth().currentUser;
    if (user) {
      this.setState({ loggedIn: true });
      getUser(user.uid).then(res => {
        this.setState({
          savedApartments: res.data.data.SavedApartments
        });
        if (this.state.savedApartments.includes(this.state.apartment._id)) {
          document.getElementById("heart_icon").classList.add(styles.saved);
        }
      });
    } else {
      this.setState({ loggedIn: false });
    }

    // Get Apartment
    getApartment(this.props.match.params.id)
      .then(res => {
        this.setState({
          apartment: res.data.data
        });
        if (this.state.apartment.UserID) {
          this.getUserEmail(this.state.apartment.UserID);
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
      var user = firebase.auth().currentUser;
      if (event.currentTarget.classList.contains(styles.saved)) {
        event.currentTarget.classList.remove(styles.saved);
        removeFromSavedApts(this.state.apartment._id, user.uid).then(res => {
          console.log(res);
        });
      } else {
        event.currentTarget.classList.add(styles.saved);
        addToSavedApts(this.state.apartment._id, user.uid).then(res => {
          console.log(res);
        });
      }
    }
  }

  getUserEmail(id) {
    getUser(id).then(res => {
      this.setState({
        userEmail: res.data.data.Email
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
              {this.state.userEmail}
            </div>
          </div>
          <div className={styles.heart}>
            <FaHeart id={"heart_icon"} onClick={this.heartApartment} />
          </div>
        </div>
      </div>
    );
  }
}

export default DetailView;

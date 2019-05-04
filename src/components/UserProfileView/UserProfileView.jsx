import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";

import firebase from "../Firebase";
import styles from "./UserProfileView.module.scss";
import { getUser } from "../../backend_helper";

import Navbar from "../Navbar/Navbar";
import ApartmentCard from "./ApartmentCard/ApartmentCard.jsx";

class UserProfileView extends Component {
  constructor() {
    super();

    this.state = {
      numItemsPerRow: 3,
      user: null
    };

    this.logoutClickHandler.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.uid === this.props.match.params.id) {
        // The Correct User Is Signed In
        getUser(this.props.match.params.id)
          .then(res => {
            this.setState({
              user: res.data.data
            });
          })
          .catch(err => {
            this.props.history.push({
              pathname: "/",
              state: {}
            });
          });
      } else {
        // User Is Not Signed In Or Incorrect User Is Signed In
        this.props.history.push({
          pathname: "/",
          state: {}
        });
      }
    });
  }

  logoutClickHandler(event) {
    firebase.auth().signOut().then(() => {

    }).catch(err => {

    });
  }

  render() {
    // Don't Render
    if (!this.state.user) {
      return null;
    }

    // Render
    return (
      <div className={styles.userprofile}>
        <Navbar />

        <div className={styles.profile}>
          <img
            className={styles.profilePicture}
            src={this.state.user.ImageURL}
            alt="profile"
          />

          <div className={styles.profileName}>
            <h1>{this.state.user.Name}</h1>
          </div>

          <div className={styles.profileDetails}>
            <span className={styles.profileDetailsSection}>
              <p>{"Email: " + this.state.user.Email}</p>
            </span>

            <span className={styles.profileDetailsSection}>
              <p>{"Phone #: " + this.state.user.CellPhone}</p>
            </span>
          </div>

          <div className={styles.profileMisc}>
            <Button
              fluid
              className={styles.add_btn}
              as={Link} to={`/createListing`}
            >
              Add Apartment
            </Button>
          </div>

          <div className={styles.profileMisc}>
            <Button
              fluid
              className={styles.logout_btn}
              onClick={this.logoutClickHandler}
            >
              Logout
            </Button>
          </div>
        </div>

        <div className={styles.apartments}>
          <div className={styles.ownedApartments}>
            <h1>My Apartments</h1>
            <div className={styles.cardGroup}>
              <Card.Group itemsPerRow={this.state.numItemsPerRow}>
                {this.state.user.CurrentApartments.map(apartmentID => (
                  <ApartmentCard key={apartmentID} id={apartmentID} />
                ))}
              </Card.Group>
            </div>
          </div>

          <div className={styles.favoriteApartments}>
            <h1>Favorite Apartments</h1>
            <div className={styles.cardGroup}>
              <Card.Group itemsPerRow={this.state.numItemsPerRow}>
                {this.state.user.SavedApartments.map(apartmentID => (
                  <ApartmentCard key={apartmentID} id={apartmentID} />
                ))}
              </Card.Group>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileView;

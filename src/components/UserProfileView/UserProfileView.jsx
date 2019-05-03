import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

import firebase from "../Firebase";
import styles from "./UserProfileView.module.scss";
import { getUser } from "../../backend_helper";
import background from "./profile_pic.jpg";

import Navbar from "../Navbar/Navbar";

class UserProfileView extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };

    this.addApartmentClickHandler.bind(this);
  }

  componentDidMount() {
    getUser(this.props.match.params.id).then(res => {
      this.setState({
        user: res.data.data
      });
    }).catch(err => {
      this.props.history.push({
        pathname: "/",
        state: {}
      });
    });
  }

  addApartmentClickHandler(event) {
    console.log("Add Apartment");
  }

  render() {
    console.log(this.state.user);
    return (
      <div className={styles.userprofile}>
        <Navbar />
        <div className={styles.profile}>
          <img className={styles.profilePicture} src={background}></img>

          <div className={styles.profileName}>
            <h1>{this.state.user.Name}</h1>
          </div>

          <div className={styles.profileDetails}>
            <span className={styles.profileDetailsSection}>
              <p>Email: </p>
              <p>{this.state.user.Email}</p>
            </span>
            
            <span className={styles.profileDetailsSection}>
              <p>Phone Number: </p>
              <p>{this.state.user.CellPhone}</p>
            </span>
          </div>

          <div className={styles.profileMisc}>
            <Button fluid color='red' onClick={this.addApartmentClickHandler}>Add Apartment</Button>
          </div>
          
        </div>

        <div className={styles.apartments}>
          <div className={styles.ownedApartments}>
            <h1>My Apartments</h1>
          </div>

          <div className={styles.favoriteApartments}>
            <h1>Favorite Apartments</h1>
          </div>
        </div>
    </div>
    );
  }
}

export default UserProfileView;
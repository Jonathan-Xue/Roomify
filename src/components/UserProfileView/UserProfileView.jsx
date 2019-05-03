import React, { Component } from "react";
import { Link } from "react-router-dom";

import firebase from "../Firebase";
import styles from "./UserProfileView.module.scss";
import { getUser } from "../../backend_helper";

import {
  FaBed,
  FaBath,
  FaHeart,
  FaCalendarAlt,
  FaUserAlt
} from "react-icons/fa";
import Navbar from "../Navbar/Navbar";

class UserProfileView extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
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

  render() {
    return (
      <div className={styles.detailView}>
        <Navbar />
        <h1>User Name</h1>
      </div>
    );
  }
}

export default UserProfileView;
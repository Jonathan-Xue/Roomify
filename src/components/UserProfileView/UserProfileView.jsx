import React, { Component } from "react";

import styles from "./UserProfileView.module.scss";

import {
  FaBed,
  FaBath,
  FaHeart,
  FaCalendarAlt,
  FaUserAlt
} from "react-icons/fa";
import Navbar from "../Navbar/Navbar";

import { getUser } from "../../backend_helper";

class UserProfileView extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.detailView}>
        <Navbar />
        
      </div>
    );
  }
}

export default UserProfileView;
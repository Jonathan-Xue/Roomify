import React, { Component } from "react";

import styles from "./Search.module.scss";
import ApartmentView from "./ApartmentView/ApartmentView";

import { FaSearch } from "react-icons/fa";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onGetSearch(this.state.searchValue);
  }

  render() {
    return (
      <div className={styles.search_view}>
        <div className={styles.search}>
          <h1>Enter a location:</h1>
          <div className={styles.searchBar}>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.searchValue}
                onChange={this.handleChange}
              />
              <FaSearch className={styles.searchIcon} />
            </form>
          </div>
        </div>
        <ApartmentView loggedIn={this.props.loggedIn} />
      </div>
    );
  }
}

export default Search;

import React, { Component } from "react";

import styles from "./Search.module.scss";
import ApartmentView from "./ApartmentView/ApartmentView";
import Geosuggest from "react-geosuggest";

class Search extends Component {
  constructor() {
    super();

    this.state = { location: {} };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(suggest) {
    if (suggest) {
      this.setState({
        location: suggest.location // has lat and lng
      });
    }
  }

  render() {
    return (
      <div className={styles.search_view}>
        <div className={styles.search}>
          <h1>Enter a location:</h1>
          <div className={styles.searchBar}>
            <Geosuggest onSuggestSelect={this.handleSubmit} />
          </div>
        </div>
        <div className={styles.apartmentWrapper}>
          <div className={styles.apartmentView}>
            <ApartmentView location={this.state.location} />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

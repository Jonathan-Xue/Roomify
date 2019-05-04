import React, { Component } from "react";

import styles from "./Search.module.scss";
import ApartmentView from "./ApartmentView/ApartmentView";
import Geosuggest from "react-geosuggest";

import { getNearbyApts, getApartments } from "../../backend_helper";

class Search extends Component {
  constructor() {
    super();

    this.state = { lat: 0, lng: 0, apartments: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(suggest) {
    if (suggest) {
      this.setState({
        lat: suggest.location.lat,
        lng: suggest.location.lng
      });
      getNearbyApts(this.state.lat, this.state.lng, 2.0)
        .then(res => {
          this.setState({
            apartments: res.data.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    getApartments(100, {}, {}, {}, {}, {}).then(res => {
      this.setState({ apartments: res.data.data });
    });
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
            <ApartmentView
              apartments={this.state.apartments}
              lat={this.state.lat}
              lng={this.state.lng}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

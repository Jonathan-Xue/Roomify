import React, { Component } from "react";

import { getApartments } from "../../../backend_helper";

import ApartmentDetail from "./ApartmentDetail/ApartmentDetail";

class ApartmentView extends Component {
  constructor() {
    super();

    this.state = {
      apartments: []
    };
  }

  componentDidMount() {
    getApartments(
      100,
      {},

      0,
      0,
      0,
      0
    ).then(res => {
      this.setState({
        apartments: res.data.data
      });
    });
  }

  render() {
    var apartmentList = [];

    if (this.state.apartments) {
      for (let i = 0; i < this.state.apartments.length; i++) {
        var apartment = this.state.apartments[i];

        apartmentList.push(
          <ApartmentDetail
            apartment={apartment}
            id={apartment._id}
            num={i}
            key={i}
          />
        );
      }
    }

    return apartmentList;
  }
}

export default ApartmentView;

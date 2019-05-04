import React, { Component } from "react";

import ApartmentDetail from "./ApartmentDetail/ApartmentDetail";

class ApartmentView extends Component {
  constructor() {
    super();

    this.state = {
      apartments: []
    };
  }

  render() {
    var apartmentList = [];

    if (this.props.apartments) {
      for (let i = 0; i < this.props.apartments.length; i++) {
        var apartment = this.props.apartments[i];

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

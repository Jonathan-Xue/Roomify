import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Card, Image } from 'semantic-ui-react'

import styles from './ApartmentCard.module.scss'
import { getApartment } from "../../../backend_helper.js";

class ApartmentCard extends Component {
  constructor() {
    super();

    this.state = {
      apartment: null
    }

    // Lifecycle Functions
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    getApartment(this.props.id).then(res => {
      this.setState({
        apartment: res.data.data
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    // Don't Render
    if (!this.state.apartment) {
      return null;
    }



    // Render
    return (
      <Card as={Link} to={`/apartment/${this.props.id}`} className = {styles.card}>
        <Image className={styles.cardImage}  src={this.state.apartment.ImageURL} />

        <Card.Content>
          <Card.Header>Apartment</Card.Header>

          <Card.Meta>
            <div>
              <span>{this.state.apartment.Address}</span>
            </div>
          </Card.Meta>

          <Card.Description>
            <div></div>
          </Card.Description>
        </Card.Content>        
      </Card>
    );
  }
}

export default ApartmentCard
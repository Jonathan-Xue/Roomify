import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import firebase from "../Firebase";
import styles from "./CreateListingView.module.scss";
import { createApartment } from "../../backend_helper";

import defaultBackground from "./default.jpg";
import Navbar from "../Navbar/Navbar";

class createListingView extends Component {
  constructor() {
    super();

    this.state = {
      latLong: null,
      userID: null,

      address: null,
      startDate: null,
      endDate: null,
      numBeds: null,
      numBaths: null,
      imgURL: null,

      addressError: true,
      startDateError: true,
      endDateError: true,
      numBedsError: true,
      numBathsError: true,
      imgURLError: true,

      formError: false,
      createListingError: null
    };

    // Input Change Handlers
    this.addressInputChangeHandler = this.addressInputChangeHandler.bind(this);
    this.startDateInputChangeHandler = this.startDateInputChangeHandler.bind(this);
    this.endDateInputChangeHandler = this.endDateInputChangeHandler.bind(this);
    this.numBedsInputChangeHandler = this.numBedsInputChangeHandler.bind(this);
    this.numBathsInputChangeHandler = this.numBathsInputChangeHandler.bind(this);
    this.imgURLInputChangeHandler = this.imgURLInputChangeHandler.bind(this);

    // Click Handlers
    this.createListingButtonClickHandler = this.createListingButtonClickHandler.bind(this);
    
  }

  addressInputChangeHandler(event) {

  }

  startDateInputChangeHandler(event) {

  }

  endDateInputChangeHandler(event) {

  }

  numBedsInputChangeHandler(event) {

  }

  numBathsInputChangeHandler(event) {

  }

  imgURLInputChangeHandler(event) {
    // Update State
    this.setState({ imgURL: event.target.value }, () => {
      // Valid Image URL
      var img = new Image();
      img.onload = () => {
        this.setState({ imgURLError: false });
      };
      img.onerror = () => {
        this.setState({ imgURLError: true });
      };

      img.src = this.state.imgURL;
    });
  }

  createListingButtonClickHandler(event) {
    // Form Has An Error
    if (
      this.state.addressError ||
      this.state.startDateError || 
      this.state.endDateError || 
      this.state.imgURLError
    ) {
      this.setState({ formError: true });
      this.setState({ createListingError: null });
    } else {
      // Form Error
      this.setState({ formError: false });

      // Create Apartment
      // this.setState({ createListingError: err });
    }
  }

  render() {
    return (
      <div className={styles.createListing}>
        <Navbar />

        <div className={styles.left}>
          <div className={styles.header}>
            <h1>Create Listing</h1>
          </div>

          <Form error className={styles.form}>
            {this.state.formError ? (
              <Message
                error
                header="Invalid Field(s)"
                content="One of more of the required fields are empty/invalid. Please verify the information below."
              />
            ) : null}

            <Form.Field>
              <Form.Input
                label="Address"
                placeholder="Address"
                onChange={this.addressInputChangeHandler}
                error={this.state.addressError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                label="Apartment Image URL"
                placeholder="https://google.com"
                onChange={this.imgURLInputChangeHandler}
                error={this.state.imgURLError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                label="Start Date"
                placeholder=""
                onChange={this.startDateInputChangeHandler}
                error={this.state.startDateError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                label="End Date"
                placeholder=""
                onChange={this.endDateInputChangeHandler}
                error={this.state.endDateError}
              />
            </Form.Field>

            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  label="# Beds"
                  placeholder=""
                  onChange={this.numBedsInputChangeHandler}
                  error={this.state.numBedsError}
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  label="# Baths"
                  placeholder=""
                  onChange={this.numBathsInputChangeHandler}
                  error={this.state.numBathsError}
                />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <Button
                fluid
                className={styles.createListingButton}
                type="button"
                onClick={this.createListingButtonClickHandler}
              >
                Create Listing
              </Button>
            </Form.Field>
          </Form>
        </div>

        <div className={styles.right}>
          <img className={styles.background} alt="" src={this.state.imgURLError ? defaultBackground : this.state.imgURL} />
        </div>
      </div>        
    );
  }
}

export default createListingView;

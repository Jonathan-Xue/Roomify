import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import moment from 'moment'
import { DateInput } from 'semantic-ui-calendar-react';

import firebase from "../Firebase";
import styles from "./CreateListingView.module.scss";
import { createApartment } from "../../backend_helper";

import defaultBackground from "./default.jpg";
import Navbar from "../Navbar/Navbar";

class createListingView extends Component {
  constructor() {
    super();

    this.state = {
      latLong: [],
      userID: "",

      address: "",
      startDate: "",
      endDate: "",
      numBeds: "",
      numBaths: "",
      imgURL: "",

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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userID: user.uid
        });
      } else {
        this.props.history.push({
          pathname: "/login",
          state: {}
        });
      }
    });
  }

  addressInputChangeHandler(event) {
    this.setState({address: event.target.value}, () => {
      if (true /*TODO: valid address (lat-long)*/) {
        // TODO: setState( {latLong: xxx })

        this.setState({ addressError: false });
      } else {
        this.setState({ addressError: true });
      }
    });
  }

  startDateInputChangeHandler(event, {value}) {
    this.setState({startDate: value}, () => {
      if (moment(this.state.startDate, 'MM-DD-YYYY', true).isValid() || moment(this.state.startDate, 'MM/DD/YYYY', true).isValid()) {
        this.setState({ startDateError: false });
      } else {
        this.setState({ startDateError: true });        
      }
    });
  }

  endDateInputChangeHandler(event, {value}) {
    this.setState({endDate: value}, () => {
      if (moment(this.state.endDate, 'MM-DD-YYYY', true).isValid() || moment(this.state.endDate, 'MM/DD/YYYY', true).isValid()) {
        this.setState({ endDateError: false });
      } else {
        this.setState({ endDateError: true });        
      }
    });
  }

  numBedsInputChangeHandler(event) {
    this.setState({numBeds: event.target.value}, () => {
      if (/^\d+$/.test(this.state.numBeds)) {
        this.setState({ numBedsError: false });
      } else {
        this.setState({ numBedsError: true });
      }
    });
  }

  numBathsInputChangeHandler(event) {
    this.setState({numBaths: event.target.value}, () => {
      if (/^\d+$/.test(this.state.numBaths)) {
        this.setState({ numBathsError: false });
      } else {
        this.setState({ numBathsError: true });
      }
    });
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
      createApartment(
        this.state.latLong,
        this.state.address,
        this.state.startDate,
        this.state.endDate,
        this.state.numBeds,
        this.state.numBaths,
        this.state.userID,
        this.state.imgURL
      ).then(res => {
        // TODO: Fix -> Go To User Profile Page
        this.props.history.push({
          pathname: '/',
          state: {}
        });
      }).catch(err => {
        this.setState({ createListingError: err });
      });
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
              <DateInput
                icon=""
                label="Start Date"
                value={this.state.startDate}
                placeholder={moment(new Date()).format("MM-DD-YYYY")}
                initialDate={moment(new Date())}
                minDate={moment(new Date())}
                dateFormat="MM-DD-YYYY"
                onChange={this.startDateInputChangeHandler}
                error={this.state.startDateError}
              />
            </Form.Field>

            <Form.Field>
              <DateInput
                icon=""
                label="End Date"
                placeholder={moment(new Date()).add(3, 'months').format("MM-DD-YYYY")}
                initialDate={moment(new Date()).add(3, 'months')}
                minDate={moment(new Date()).add(3, 'months')}
                dateFormat="MM-DD-YYYY"
                value={this.state.endDate}
                onChange={this.endDateInputChangeHandler}
                error={this.state.endDateError}
              />
            </Form.Field>

            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  label="# Beds"
                  placeholder="0"
                  onChange={this.numBedsInputChangeHandler}
                  error={this.state.numBedsError}
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  label="# Baths"
                  placeholder="0"
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

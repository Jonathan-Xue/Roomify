import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import firebase from "../Firebase";
import styles from "./RegisterView.module.scss";
import { createUser } from "../../backend_helper";

import background from "./background.jpg";
import Navbar from "../Navbar/Navbar";

class RegisterView extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      profilePicture: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordMatch: "",

      nameError: true,
      profilePictureError: true,
      emailError: true,
      phoneNumberError: true,
      passwordError: true,
      passwordMatchError: true,

      formError: false,
      registerError: null
    };

    // Input Change Handlers
    this.nameInputChangeHandler = this.nameInputChangeHandler.bind(this);
    this.profilePictureInputChangeHandler = this.profilePictureInputChangeHandler.bind(
      this
    );
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
    this.phoneNumberInputChangeHandler = this.phoneNumberInputChangeHandler.bind(
      this
    );
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(
      this
    );
    this.passwordMatchInputChangeHandler = this.passwordMatchInputChangeHandler.bind(
      this
    );

    // Click Handlers
    this.registerButtonClickHandler = this.registerButtonClickHandler.bind(
      this
    );
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push({
          pathname: "/",
          state: {}
        });
      }
    });
  }

  nameInputChangeHandler(event) {
    // Update State
    this.setState({ name: event.target.value }, () => {
      // Valid Name Check
      if (/\S/.test(this.state.name)) {
        this.setState({ nameError: false });
      } else {
        this.setState({ nameError: true });
      }
    });
  }

  profilePictureInputChangeHandler(event) {
    // Update State
    this.setState({ profilePicture: event.target.value }, () => {
      // Valid Image URL
      var img = new Image();
      img.onload = () => {
        this.setState({ profilePictureError: false });
      };
      img.onerror = () => {
        this.setState({ profilePictureError: true });
      };

      img.src = this.state.profilePicture;
    });
  }

  emailInputChangeHandler(event) {
    // Update State
    this.setState({ email: event.target.value }, () => {
      // Valid Email Check
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
        this.setState({ emailError: false });
      } else {
        this.setState({ emailError: true });
      }
    });
  }

  phoneNumberInputChangeHandler(event) {
    // Update State
    this.setState({ phoneNumber: event.target.value }, () => {
      // Valid Phone Number Check
      if (
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
          this.state.phoneNumber
        )
      ) {
        this.setState({ phoneNumberError: false });
      } else {
        this.setState({ phoneNumberError: true });
      }
    });
  }

  passwordInputChangeHandler(event) {
    // Update State
    this.setState({ password: event.target.value }, () => {
      // Valid Password Check
      if (this.state.password.length > 8) {
        this.setState({ passwordError: false });
      } else {
        this.setState({ passwordError: true });
      }

      // Passwords Match Check
      if (this.state.password === this.state.passwordMatch) {
        this.setState({ passwordMatchError: false });
      } else {
        this.setState({ passwordMatchError: true });
      }
    });
  }

  passwordMatchInputChangeHandler(event) {
    // Update State
    this.setState({ passwordMatch: event.target.value }, () => {
      // Passwords Match Check
      if (this.state.password === this.state.passwordMatch) {
        this.setState({ passwordMatchError: false });
      } else {
        this.setState({ passwordMatchError: true });
      }
    });
  }

  registerButtonClickHandler(event) {
    // Form Has An Error
    if (
      this.state.nameError ||
      this.state.profilePictureError ||
      this.state.emailError ||
      this.state.phoneNumberError ||
      this.state.passwordError ||
      this.state.passwordMatchError
    ) {
      this.setState({ formError: true });
      this.setState({ registerError: null });
    } else {
      // Form Error
      this.setState({ formError: false });

      // User Registration
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          // Create User In Database
          createUser(
            user.user.uid,
            this.state.phoneNumber,
            this.state.email,
            this.state.name,
            this.state.profilePicture
          ).then(res => {
            this.props.history.push({
              pathname: "/",
              state: {}
            });
          });
        })
        .catch(err => {
          this.setState({ registerError: err });
        });
    }
  }

  render() {
    return (
      <div className={styles.register}>
        <Navbar />
        <div className={styles.left}>
          <img className={styles.background} alt="" src={background} />
        </div>

        <div className={styles.right}>
          <div className={styles.header}>
            <h1 className={styles.brand}>Roomify</h1>
          </div>

          <Form error className={styles.form}>
            {this.state.formError ? (
              <Message
                error
                header="Invalid Field(s)"
                content="One of more of the required fields are empty/invalid. Please verify the information below."
              />
            ) : this.state.registerError ? (
              <Message
                error
                header="Account Already Exists"
                content="An account already exists for this email address. Please log in or confirm that your email address is correct."
              />
            ) : null}

            <Form.Field>
              <Form.Input
                label="Name"
                placeholder="Name"
                onChange={this.nameInputChangeHandler}
                error={this.state.nameError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                label="Profile Picture URL"
                placeholder="https://google.com"
                onChange={this.profilePictureInputChangeHandler}
                error={this.state.profilePictureError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                label="Email"
                placeholder="Email"
                onChange={this.emailInputChangeHandler}
                error={this.state.emailError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                label="Phone Number"
                placeholder="Phone Number"
                onChange={this.phoneNumberInputChangeHandler}
                error={this.state.phoneNumberError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                type="password"
                label="Password"
                placeholder="Password"
                onChange={this.passwordInputChangeHandler}
                error={this.state.passwordError}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                type="password"
                label="Re-enter Password"
                placeholder="Re-enter Password"
                onChange={this.passwordMatchInputChangeHandler}
                error={this.state.passwordMatchError}
              />
            </Form.Field>

            <Form.Field>
              <Button
                fluid
                className={styles.register_button}
                type="button"
                onClick={this.registerButtonClickHandler}
              >
                Register
              </Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterView;

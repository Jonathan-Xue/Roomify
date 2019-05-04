import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import firebase from "../Firebase";
import styles from "./LoginView.module.scss";

import background from "./background.jpg";
import Navbar from "../Navbar/Navbar";

class LoginView extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",

      formError: false,
      loginError: null
    };

    // Input Change Handlers
    this.usernameInputChangeHandler = this.usernameInputChangeHandler.bind(
      this
    );
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(
      this
    );

    // Click Handlers
    this.signInButtonClickHandler = this.signInButtonClickHandler.bind(this);
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

  usernameInputChangeHandler(event) {
    // Update State
    this.setState({ username: event.target.value }, () => {
      // console.log(this.state.username);
    });
  }

  passwordInputChangeHandler(event) {
    // Update State
    this.setState({ password: event.target.value }, () => {
      // console.log(this.state.password);
    });
  }

  signInButtonClickHandler(event) {
    // User Auth
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(user => {
        this.props.history.push({
          pathname: "/",
          state: {}
        });
      })
      .catch(err => {
        this.setState({ loginError: err });
      });
  }

  registerButtonClickHandler(event) {
    // Link To Register Page
    this.props.history.push({
      pathname: "/register",
      state: {}
    });
  }

  render() {
    return (
      <div className={styles.login}>
        <Navbar />
        <div className={styles.left}>
          <img className={styles.background} alt="" src={background} />
        </div>

        <div className={styles.right}>
          <div className={styles.header}>
            <h1 className={styles.brand}>Roomify</h1>
          </div>

          <Form error className={styles.form}>
            {this.state.loginError ? (
              <Message
                error
                header="Error"
                content="Unable to log in. The username and/or password you have entered is incorrect."
              />
            ) : null}
            <Form.Field>
              <Form.Input
                label="Username/Email"
                placeholder="Username/Email"
                onChange={this.usernameInputChangeHandler}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="password"
                label="Password"
                placeholder="Password"
                onChange={this.passwordInputChangeHandler}
              />
            </Form.Field>
            <Form.Field>
              <Button
                fluid
                className={styles.sign_in_button}
                type="button"
                onClick={this.signInButtonClickHandler}
              >
                Sign In
              </Button>
            </Form.Field>
            <b>No account?</b>
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

export default LoginView;

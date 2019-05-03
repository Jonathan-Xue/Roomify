import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

// Components
import HomeView from "../HomeView/HomeView.jsx";
import LoginView from "../LoginView/LoginView.jsx";
import RegisterView from "../RegisterView/RegisterView.jsx";
import DetailView from "../DetailView/DetailView.jsx";
import UserProfileView from "../UserProfileView/UserProfileView.jsx";

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={HomeView} />

          <Route exact path="/login" component={LoginView} />
          <Route exact path="/register" component={RegisterView} />
          <Route path="/user/:id" component={UserProfileView} />
          <Route path="/apartment/:id" component={DetailView} />
        </Switch>
      </Router>
    );
  }
}

export default App;

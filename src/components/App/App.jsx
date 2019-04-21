import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

// Components
import HomeView from '../HomeView/HomeView.jsx'
import LoginView from '../LoginView/LoginView.jsx'
import RegisterView from '../RegisterView/RegisterView.jsx'

class App extends Component {
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Switch>
					<Route exact path='/' component={HomeView}/>

					<Route exact path='/login' component={LoginView}/>
					<Route exact path='/register' component={RegisterView}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
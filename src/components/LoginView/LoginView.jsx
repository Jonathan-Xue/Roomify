import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

import styles from './LoginView.module.scss'

import background from './background.jpg'

class LoginView extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: ''
		}

		// Input Change Handlers
		this.usernameInputChangeHandler = this.usernameInputChangeHandler.bind(this);
		this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);

		// Click Handlers
		this.signInButtonClickHandler = this.signInButtonClickHandler.bind(this);
		this.registerButtonClickHandler = this.registerButtonClickHandler.bind(this);
	}

	usernameInputChangeHandler(event) {
		// Update State
		this.setState({username: event.target.value}, () => {
			// console.log(this.state.username);
		});
	}

	passwordInputChangeHandler(event) {
		// Update State
		this.setState({password: event.target.value}, () => {
			// console.log(this.state.password);
		});
	}
	
	signInButtonClickHandler(event) {
		// User Auth
		if (true) {
			this.props.history.push({
				pathname: '/',
				state: {}
			});
		}
	}

	registerButtonClickHandler(event) {
		// Link To Register Page
		this.props.history.push({
			pathname: '/register',
			state: {}
		});
	}

	render() {
		return (
			<div className={styles.login}>
				<div className={styles.left}>
					<img className={styles.background} alt="" src={background}></img>
				</div>

				<div className={styles.right}>
					<div className={styles.header}>
						<h1>ROOMIFY</h1>
						<h3>Find Your Home</h3>
					</div>

					<Form className={styles.form}>
						<Form.Field>
							<Form.Input label="Username/Email" placeholder='Username/Email' onChange={this.usernameInputChangeHandler}></Form.Input>
						</Form.Field>

						<Form.Field>
							<Form.Input label="Password" type='password' placeholder='Password' onChange={this.passwordInputChangeHandler}></Form.Input>
						</Form.Field>

						<Form.Field>
							<Button fluid type="button" className={styles.sign_in_button} onClick={this.signInButtonClickHandler}>Sign In</Button>
						</Form.Field>

						<Form.Field>
							<Button fluid type="button" className={styles.register_button} onClick={this.registerButtonClickHandler}>Register</Button>
						</Form.Field>
					</Form>
				</div>
			</div>	
		);
	}
}

export default LoginView
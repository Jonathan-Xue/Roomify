import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

import firebase from '../Firebase';
import styles from './RegisterView.module.scss'

import background from './background.jpg'

class RegisterView extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			phoneNumber: '',
			password: '',
			passwordMatch: '',

			emailError: true,
			phoneNumberError: true,
			passwordError: true,
			passwordMatchError: true,

			formError: false,
			registerError: null
		}

		// Input Change Handlers
		this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
		this.phoneNumberInputChangeHandler = this.phoneNumberInputChangeHandler.bind(this);
		this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);
		this.passwordMatchInputChangeHandler = this.passwordMatchInputChangeHandler.bind(this);

		// Click Handlers
		this.registerButtonClickHandler = this.registerButtonClickHandler.bind(this);
	}

	emailInputChangeHandler(event) {
		// Update State
		this.setState({email: event.target.value}, () => {
			// Valid Email Check
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
				this.setState({emailError: false});
			} else {
				this.setState({emailError: true});
			}
		});
	}

	phoneNumberInputChangeHandler(event) {
		// Update State
		this.setState({phoneNumber: event.target.value}, () => {
			// Valid Phone Number Check
			if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(this.state.phoneNumber)){
				this.setState({phoneNumberError: false});
			} else {
				this.setState({phoneNumberError: true});
			}
		});
	}

	passwordInputChangeHandler(event) {
		// Update State
		this.setState({password: event.target.value}, () => {
			// Valid Password Check
			if (this.state.password.length > 8) {
				this.setState({passwordError: false});
			} else {
				this.setState({passwordError: true});
			}

			// Passwords Match Check
			if (this.state.password === this.state.passwordMatch) {
				this.setState({passwordMatchError: false});
			} else {
				this.setState({passwordMatchError: true});
			}
		});
	}

	passwordMatchInputChangeHandler(event) {
		// Update State
		this.setState({passwordMatch: event.target.value}, () => {
			// Passwords Match Check
			if (this.state.password === this.state.passwordMatch) {
				this.setState({passwordMatchError: false});
			} else {
				this.setState({passwordMatchError: true});
			}
		});		
	}

	registerButtonClickHandler(event) {
		// Form Has An Error
		if (this.state.emailError || this.state.phoneNumberError || this.state.passwordError || this.state.passwordMatchError) {
			this.setState({formError: true});
			this.setState({registerError: null});
		} else {
			// Form Error
			this.setState({formError: false});

			// User Registration
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
				// console.log(user.uid);
				this.props.history.push({
					pathname: '/',
					state: {}
				});
			}).catch((err) => {
				this.setState({registerError: err});
			});
		}
	}

	render() {
		return (
			<div className={styles.register}>
				<div className={styles.left}>
					<img className={styles.background} alt='' src={background}></img>
				</div>

				<div className={styles.right}>
					<div className={styles.header}>
						<h1>ROOMIFY</h1>
						<h3>Find Your Home</h3>
					</div>

					<Form error className={styles.form}>
						{this.state.formError
							? 
								<Message error header="Invalid Field(s)" content="One of more of the required fields are empty/invalid. Please verify the information above."/>
							:
								this.state.registerError 
									? 
										<Message error header="Account Already Exists" content="An account already exists for this email address. Please log in or confirm that your email address is correct."/>
									:
										null
						}

						<Form.Field>
							<Form.Input label='Email' placeholder='Email' onChange={this.emailInputChangeHandler} error={this.state.emailError}></Form.Input>
						</Form.Field>

						<Form.Field>
							<Form.Input label='Phone Number' placeholder='Phone Number' onChange={this.phoneNumberInputChangeHandler} error={this.state.phoneNumberError}></Form.Input>
						</Form.Field>

						<Form.Field>
							<Form.Input type='password' label='Password' placeholder='Password' onChange={this.passwordInputChangeHandler} error={this.state.passwordError}></Form.Input>
						</Form.Field>

						<Form.Field>
							<Form.Input type='password' label='Re-enter Password' placeholder='Re-enter Password' onChange={this.passwordMatchInputChangeHandler} error={this.state.passwordMatchError}></Form.Input>
						</Form.Field>

						<Form.Field>
							<Button fluid className={styles.register_button} type='button' onClick={this.registerButtonClickHandler}>Register</Button>
						</Form.Field>
					</Form>
				</div>
			</div>	
		);
	}
}

export default RegisterView
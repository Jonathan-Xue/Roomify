import React, { Component } from 'react'

import firebase from '../Firebase';
import styles from './HomeView.module.scss'

class HomeView extends Component {
	constructor() {
		super();

		this.state = {
			
		}
	}
	
	componentWillMount() {
		firebase.auth().onAuthStateChanged((authenticated) => {
			if (!authenticated) {
				this.props.history.push('/login');
			}
		});
	}

	render() {
		return (
			<div className={styles.home}>
				
			</div>	
		);
	}
}

export default HomeView
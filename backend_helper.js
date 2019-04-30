import axios from 'axios'

const BASE_URL = 'https://roomify-backend.herokuapp.com/api/';

//GET '/apartments'
async function getApartments(count, where, limit, select, sort, skip) {
	try {
		let body = {
			crossDomain: true
		}
		const response = await axios.get(BASE_URL + '/apartments', body);
		return response;
	} catch (err) {
		console.log(err);
	}
}

//POST: '/apartments'
async function createApartment(latLong, addr, sd, ed, bed, bath, userId) {
	try {	
		let body = {
			LatLong: latLong,
			Address: addr,
			StartDate: sd,
			EndDate: ed,
			Bedrooms: bed,
			Bathrooms: bath, 
			UserID: userId,
			crossDomain: true
		}

		const response = await axios.post(BASE_URL + '/apartments', body);
		return response;
	} catch(err) {
		console.log(err);
	}
}

//GET: '/apartments/:id'
async function getApartment(aptId) {
	try {
		let body = {
			crossDomain: true
		}

		const response = await axios.get(BASE_URL + '/apartments/' + aptId, body);
		return response;

	} catch (err) {
		console.log(err);
	}
}

//PUT: '/apartments/:id'
async function updateApartment(aptId, latLong, addr, sd, ed, bed, bath, userId) {
	try {
		let body = {
			LatLong: latLong,
			Address: addr,
			StartDate: sd,
			EndDate: ed,
			Bedrooms: bed,
			Bathrooms: bath, 
			UserID: userId,
			crossDomain: true
		}

		const response = await axios.put(BASE_URL + '/apartments/' + aptId, body)
	} catch (err) {
		console.log(err);
	}
}

//DELETE: '/apartments/:id'
async function deleteApartment(aptId) {
	try {
		let body = {
			crossDomain: true
		}

		const response  = await axios.delete(BASE_URL + '/apartments/' + aptId, body);
		return response;
	} catch (err) {
		console.log(err);
	}
}

//GET: '/users'
async function getUsers(count, where, limit, select, sort, skip) {
	try {
		let body = {
			crossDomain: true
		}

		const response = await axios.get(BASE_URL + '/users', body)
		return response;
	} catch (err) {
		console.log(err);
	}
}

//POST: '/users’
async function createUser(userId, cp, e, n) {
	try {
		/**req.body.currentApartments: []
		*req.body.userID: String
		*req.body.savedApartments: []
		*req.body.cellPhone: String
		*req.body.email: String
		*req.body.name: String
		*/

		let body = {
			userID: userId,
			currentApartments: [],
			savedApartments: [],
			cellPhone: cp,
			email: e,
			name: n,
			crossDomain: true
		}
		const response = await axios.post(BASE_URL + '/users', body);
		return response;

	} catch (err) {
		console.log(err);
	}
}

//GET: '/users/:id’
async function getUser(userId) {
	try {
		let body = {
			crossDomain: true
		}

		const response = await axios.get(BASE_URL + '/users/' + userId, body);
		return response;

	} catch (err) {
		console.log(err);
	}
}

//PUT: '/users/:id'
async function updateUser(ca, sa, cp, e, n, userId) {
	try {
		/**req.body.currentApartments: []
		*req.body.savedApartments: []
		*req.body.cellPhone: String
		*req.body.email: String
		*req.body.name: String
		*/

		let body = {
			currentApartments: ca,
			savedApartments: sa,
			cellPhone: cp,
			email: e,
			name: n, 
			crossDoman: true
		}
		const response = await axios.post(BASE_URL + '/users/' + userId, body);
		return response;

	} catch (err) {
		console.log(err);
	}
}

//DELETE: ‘/users/:id'
async function deleteUser(userId) {
	try {
		let body = {
			crossDomain: true
		}

		const response  = await axios.delete(BASE_URL + '/users/' + userId, body);
		return response;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getApartments: getApartments,
	createApartment: createApartment,
	getApartment: getApartment,
	updateApartment: updateApartment, 
	deleteApartment: deleteApartment,
	getUsers: getUsers,
	createUser: createUser,
	getUser: getUser,
	updateUser: updateUser,
	deleteUser: deleteUser
};
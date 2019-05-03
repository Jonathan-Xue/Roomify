import axios from "axios";

const BASE_URL = "https://roomify-backend.herokuapp.com/api/";

//GET '/apartments'
export const getApartments = async (
  count,
  where,
  limit,
  select,
  sort,
  skip
) => {
  try {
    let body = {
      crossDomain: true
    };
    const response = await axios.get(BASE_URL + "/apartments", body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//POST: '/apartments'
export const createApartment = async (
  latLong,
  addr,
  sd,
  ed,
  bed,
  bath,
  userId
) => {
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
    };

    const response = await axios.post(BASE_URL + "/apartments", body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//GET: '/apartments/:id'
export const getApartment = async aptId => {
  try {
    let body = {
      crossDomain: true
    };

    const response = await axios.get(BASE_URL + "/apartments/" + aptId, body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//PUT: '/apartments/:id'
export const updateApartment = async (
  aptId,
  latLong,
  addr,
  sd,
  ed,
  bed,
  bath,
  userId
) => {
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
    };

    const response = await axios.put(BASE_URL + "/apartments/" + aptId, body);
  } catch (err) {
    console.log(err);
  }
};

//DELETE: '/apartments/:id'
export const deleteApartment = async aptId => {
  try {
    let body = {
      crossDomain: true
    };

    const response = await axios.delete(
      BASE_URL + "/apartments/" + aptId,
      body
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

//GET: '/users'
export const getUsers = async (count, where, limit, select, sort, skip) => {
  try {
    let body = {
      crossDomain: true
    };

    const response = await axios.get(BASE_URL + "/users", body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//POST: '/users’
export const createUser = async (userId, cp, e, n) => {
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
    };
    const response = await axios.post(BASE_URL + "/users", body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//GET: '/users/:id’
export const getUser = async userId => {
  try {
    let body = {
      crossDomain: true
    };

    const response = await axios.get(BASE_URL + "/users/" + userId, body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//PUT: '/users/:id'
export const updateUser = async (ca, sa, cp, e, n, userId) => {
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
      crossDomain: true
    };
    const response = await axios.post(BASE_URL + "/users/" + userId, body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//DELETE: ‘/users/:id'
export const deleteUser = async userId => {
  try {
    let body = {
      crossDomain: true
    };

    const response = await axios.delete(BASE_URL + "/users/" + userId, body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

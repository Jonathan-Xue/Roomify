import axios from "axios";

const BASE_URL = "https://roomify-backend.herokuapp.com/api";

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
  userId,
  imgURL
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
      ImageURL: imgURL,
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
  userId,
  imgURL
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
      ImageURL: imgURL,
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

// PUT: '/apartments/:userid/current'
export const addToCurrentApts = async (aptId, userId) => {
  try {
    let body = {
      AptID: aptId,
      crossDomain: true
    };

    const response = await axios.put(
      BASE_URL + "/apartments/" + userId + "/current",
      body
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

// PUT: '/apartments/:userid/saved'
export const addToSavedApts = async (aptId, userId) => {
  try {
    let body = {
      AptID: aptId,
      crossDomain: true
    };

    const response = await axios.put(
      BASE_URL + "/apartments/" + userId + "/saved",
      body
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

// DELETE: '/apartments/:userid/saved/:aptid'
export const removeFromSavedApts = async (aptId, userId) => {
  try {
    let body = {
      crossDomain: true
    };

    const response = await axios.delete(
      BASE_URL + "/apartments/" + userId + "/saved/" + aptId,
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
export const createUser = async (userId, cellPhone, email, name, imgURL) => {
  try {
    /**req.body.CurrentApartments: []
     *req.body.UserID: String
     *req.body.SavedApartments: []
     *req.body.CellPhone: String
     *req.body.Email: String
     *req.body.Name: String
     *req.body.ImageURL: String
     */

    let body = {
      UserID: userId,
      CurrentApartments: [],
      SavedApartments: [],
      CellPhone: cellPhone,
      Email: email,
      Name: name,
      ImageURL: imgURL,
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
export const updateUser = async (
  currentApts,
  savedApts,
  cellPhone,
  email,
  name,
  userId,
  imgURL
) => {
  try {
    /**req.body.CurrentApartments: []
     *req.body.SavedApartments: []
     *req.body.CellPhone: String
     *req.body.Email: String
     *req.body.Name: String
     *req.body.ImageURL: String
     */

    let body = {
      CurrentApartments: currentApts,
      SavedApartments: savedApts,
      CellPhone: cellPhone,
      Email: email,
      Name: name,
      ImageURL: imgURL,
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

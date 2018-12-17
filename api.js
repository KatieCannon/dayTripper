import GOOGLEAPI from "./config.js";
import Polyline from "@mapbox/polyline";
import geolib from "geolib";

const DB_URL = "https://xprfmsf0pb.execute-api.eu-west-1.amazonaws.com/dev";

export const createUserProfile = username => {
  return fetch(`${DB_URL}/createUser`, {
    method: `POST`,
    headers: {
      Accept: `application/json`,
      "Content-Type": `application/json`
    },
    body: JSON.stringify({ username: username })
  })
    .then(data => data)
    .catch(error => console.log(error));
};

export const getUserProfile = username => {
  return fetch(`${DB_URL}/getUser?username=${username}`)
    .then(data => data.json())
    .then(data => JSON.parse(data).Item)
    .catch(error => console.log(error));
};

export const updateUserPreferences = (username, preferences) => {
  return fetch(`${DB_URL}/updateUserProfile`, {
    method: `PATCH`,
    headers: {
      Accept: `application/json`,
      "Content-Type": `application/json`
    },
    body: JSON.stringify({ username: username, preferences: preferences })
  })
    .then(data => data.json())
    .then(data => JSON.parse(data))
    .catch(error => console.log(error));
};
export const updateUserInfo = (username, info) => {
  // console.log(info, "<<<<<<");
  return fetch(`${DB_URL}/updateUserProfile`, {
    method: `PATCH`,
    headers: {
      Accept: `application/json`,
      "Content-Type": `application/json`
    },
    body: JSON.stringify({ username: username, info: info })
  })
    .then(data => data.json())
    .then(data => JSON.parse(data))
    .catch(error => console.log(error));
};

export const getAttractions = (username, city) => {
  return fetch(`${DB_URL}/apiCall?username=${username}&city=${city}`)
    .then(data => data.json())
    .then(data => JSON.parse(data))
    .catch(error => console.log(error));
};

export const deleteUser = username => {};

export const getDirections = (startLoc, destinationLoc) => {
  const startPoint = `${startLoc.latitude},${startLoc.longitude}`;
  const endPoint = `${destinationLoc.latitude},${destinationLoc.longitude}`;
  return (
    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startPoint}&destination=${endPoint}&mode=walking&key=${
        GOOGLEAPI.GOOGLEDIR
      }`
    )
      .then(response => response.json())
      //decodes the response
      .then(responseJson => {
        if (responseJson.routes.length > 0) {
          let points = Polyline.decode(
            responseJson.routes[0].overview_polyline.points
          );
          let coords = points.map(point => ({
            latitude: point[0],
            longitude: point[1]
          }));
          return coords;
        }
        return [];
      })
      .catch(error => {
        console.error(error);
      })
  );
};

// export const getDistanceFromDestination = (startLoc, destinationLoc) => {
//   return geolib.getDistance(
//     {
//       latitude: startLoc.latitude,
//       longitude: startLoc.longitude
//     },
//     { latitude: destinationLoc.latitude, longitude: destinationLoc.longitude }
//   );
// };

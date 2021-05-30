"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProfile = deleteProfile;
exports.updateProfile = updateProfile;

var _basicFunctionalities = require("./basicFunctionalities.js");

function deleteProfile() {
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/users", {
    method: "DELETE",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) {
      response.json().then(function (error) {
        console.log(error);
      });
    } else {
      console.log("Usuari eliminated!");
      localStorage.removeItem('token');
      window.location.replace("../html/index.html");
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}
/**
 * Function to update the profile with the new information that users has filled in the formulari.
 * @param {*} obj Object recieved only with the profile data that has been changed.
 */


function updateProfile(obj) {
  //Here we create the FormData object as the API demands a multipart/formData content.
  var formData = new FormData();

  for (var key in obj) {
    formData.append(key, obj[key]);
  }

  console.log(formData);
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/users/", {
    method: "PUT",
    headers: {
      'Authorization': "Bearer ".concat(token)
    },
    body: formData
  }).then(function (response) {
    if (!response.ok) {
      response.json().then(function (error) {
        console.log(error);
      });
    } else {
      console.log("Usuari actualitzat correctament");
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}
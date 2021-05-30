"use strict";

var _basicFunctionalities = require("./basicFunctionalities.js");

var _moduleProfile = require("./moduleProfile.js");

(0, _basicFunctionalities.security)(); //Check if the user has authorization to see this page

window.addEventListener('load', profileLoad); //Save all the Dom elements we will need in the future

var logoutIcon = document.getElementById('logoutIcon');
var deleteBtn = document.getElementById('deleteBtn');
var saveBtn = document.getElementById('saveBtn');
var name = document.getElementById('name');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var user;
/**
 * Callback function when the DOM is rendered. His function is to load from the API the personal 
 * user information, and add the listener to the buttons.
 */

function profileLoad() {
  //Adding click listeners.
  logoutIcon.addEventListener('click', logoutCallback);
  deleteBtn.addEventListener('click', deleteCallback);
  saveBtn.addEventListener('click', saveCallback);
  var image = document.getElementById('imageProfile');
  var token = localStorage.getItem('token');
  var id = (0, _basicFunctionalities.parseJwt)(token).id;
  fetch("http://puigmal.salle.url.edu/api/users/".concat(id), {
    method: "GET",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == null) {
      console.log("La informació de l'usuari no s'ha trobat o bé no existeix cap usuari amb la id corresponent");
    } else {
      //console.log(data);
      //The personal user infromation have been recieved and we create an instance of User class
      user = new _basicFunctionalities.User(data[0]); //We update the placeholders fields with the information recieved.

      name.placeholder = user.name;
      lastname.placeholder = user.lastname;
      email.placeholder = user.email;

      if (user.image) {
        image.src = "http://puigmal.salle.url.edu/img/".concat(user.image);
      } else {
        image.src = '../media/avatar.png'; //Default image in case the image is null
      }
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}
/**
 * Function that calls the logoutUser function from the basicFunctionalities
 */


function logoutCallback() {
  console.log("Logout icon clicked");
  (0, _basicFunctionalities.logoutUser)();
}
/**
 * Function that calls the deleteProfile function from the moduleFriends. This function is the callback
 * when the users clicks the delete butotn.
 */


function deleteCallback() {
  console.log('Delete button clicked');
  (0, _moduleProfile.deleteProfile)();
}
/**
 * Callback function when user wants to save the new profile information.
 */


function saveCallback() {
  console.log('Save button clicked'); //Here we create the object with only the form fields that are not empty.

  var obj = {};

  if (name.value != "") {
    obj.name = name.value;
  }

  if (lastname.value != "") {
    obj.last_name = lastname.value;
  }

  if (email.value != "") {
    obj.email = email.value;
  }

  console.log('Anem a actualitzar el perfil');
  (0, _moduleProfile.updateProfile)(obj); //We call the function that will get the API to save the information.
  //We save the global user with the new profile information.

  if (name.value != "") {
    user.name = name.value;
  }

  if (lastname.value != "") {
    user.lastname = lastname.value;
  }

  if (email.value != "") {
    user.email = email.value;
  }
  /**
   * We update the placeholder from the inputs fields with the new information.
   */


  name.placeholder = user.name;
  lastname.placeholder = user.lastname;
  email.placeholder = user.email;
  name.value = "";
  lastname.value = "";
  email.value = "";
}
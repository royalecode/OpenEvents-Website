"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addParticipation = addParticipation;

/**
 * Function that calls the API to add a Participation as a user to the event passed by argument.
 * @param {*} event_id Event id of the one I want to assist
 */
function addParticipation(event_id) {
  var token = localStorage.getItem('token');
  console.log(event_id);
  fetch("http://puigmal.salle.url.edu/api/events/".concat(event_id, "/assistances"), {
    method: "post",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) {
      response.json().then(function (error) {
        console.log(error);
      });
    } else {
      console.log("Participació afegida correctament");
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}
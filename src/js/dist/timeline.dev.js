"use strict";

var _basicFunctionalities = require("./basicFunctionalities.js");

(0, _basicFunctionalities.security)();
window.addEventListener('load', timelinePageLoad);
var logoutIcon = document.getElementById('logoutIcon');
var app;

function timelinePageLoad() {
  logoutIcon.addEventListener('click', logoutCallback);
  app = new Vue({
    el: '#appTimeline',
    data: {
      events: []
    },
    mounted: function mounted() {
      loadEventsAssistanceFinished();
    }
  });
}

function loadEventsAssistanceFinished() {
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/users/".concat((0, _basicFunctionalities.parseJwt)(token).id, "/assistances/finished"), {
    method: "GET",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("No has participat a cap event acabat encara");
    } else {
      console.log(data);
      data.map(function (e) {
        e.image = "http://puigmal.salle.url.edu/img/" + e.image;

        if (e.eventStart_date != null) {
          e.eventStart_date = e.eventStart_date.split("T")[0];
          e.eventStart_date = e.eventStart_date.replaceAll("-", "/");
        }

        if (e.eventEnd_date != null) {
          e.eventEnd_date = e.eventEnd_date.split("T")[0];
          e.eventEnd_date = e.eventEnd_date.replaceAll("-", "/");
        }

        return e;
      });
      app.events = data;
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function logoutCallback() {
  console.log("Logout icon clicked");
  (0, _basicFunctionalities.logoutUser)();
}
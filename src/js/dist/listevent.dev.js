"use strict";

var _basicFunctionalities = require("./basicFunctionalities.js");

(0, _basicFunctionalities.security)();
window.addEventListener('load', listPageLoad);
var logoutIcon = document.getElementById('logoutIcon');
var app;

function listPageLoad() {
  logoutIcon.addEventListener('click', logoutCallback);
  app = new Vue({
    el: '#app',
    data: {
      events: []
    },
    mounted: function mounted() {
      loadEvents();
    },
    methods: {
      participate: function participate(event_id) {
        console.log(event_id);
        addParticipation(event_id);
      }
    }
  });
}

function loadEvents() {
  fetch("http://puigmal.salle.url.edu/api/events/", {
    method: "GET"
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("No hi ha events a la plataforma");
    } else {
      console.log(data);
      data.map(function (e) {
        e.image = "http://puigmal.salle.url.edu/img/" + e.image; //console.log(e.image);

        e.eventStart_date = e.eventStart_date.split("T")[0];
        e.eventStart_date = e.eventStart_date.replaceAll("-", "/");
        e.eventEnd_date = e.eventEnd_date.split("T")[0];
        e.eventEnd_date = e.eventEnd_date.replaceAll("-", "/");
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
  fetch("http://puigmal.salle.url.edu/api/events/2/assistances", {
    method: "GET",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("No hi assistents a l'event");
    } else {
      console.log(data);
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}
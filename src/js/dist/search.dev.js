"use strict";

var _basicFunctionalities = require("./basicFunctionalities.js");

(0, _basicFunctionalities.security)();
window.addEventListener('load', listSearchPageLoad);
var logoutIcon = document.getElementById('logoutIcon');
var input;
var app;

function listSearchPageLoad() {
  logoutIcon.addEventListener('click', logoutCallback);
  input = document.getElementById('search');
  input.addEventListener('keypress', renderEvents);
  app = new Vue({
    el: '#appSearch',
    data: {
      events: []
    },
    mounted: function mounted() {
      loadEvents();
    },
    methods: {
      update: function update() {
        loadEventsFilterType();
      }
    }
  });
}

function renderEvents(e) {
  if (e.key === 'Enter') {
    app.update();
    input.value = "";
  }
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

function loadEventsFilterType() {
  fetch("http://puigmal.salle.url.edu/api/events/".concat(input.value), {
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
      app.events.length = 0;
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
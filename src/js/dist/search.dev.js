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
      loadEvents(false);
    },
    methods: {
      update: function update() {
        loadEvents(true);
      },
      participate: function participate(event_id) {
        console.log(event_id);
        this.events.map(function (e) {
          if (e.id == event_id && e.ok == true) {
            addParticipation(event_id);
            console.log('change icon');
            e.source = "../media/Icons/check.svg";
            e.ok = false;
          }

          return;
        });
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

function loadEvents(isFilter) {
  var url;

  if (isFilter) {
    url = "http://puigmal.salle.url.edu/api/events/".concat(input.value);
  } else {
    url = "http://puigmal.salle.url.edu/api/events/";
  }

  fetch("".concat(url), {
    method: "GET"
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("No hi ha events a la plataforma");
    } else {
      console.log(data);
      data.map(function (e) {
        if (!e.image.startsWith("http")) {
          e.image = "http://puigmal.salle.url.edu/img/" + e.image;
        }

        if (e.eventStart_date != null) {
          e.eventStart_date = e.eventStart_date.split("T")[0];
          e.eventStart_date = e.eventStart_date.replaceAll("-", "/");
        }

        if (e.eventEnd_date != null) {
          e.eventEnd_date = e.eventEnd_date.split("T")[0];
          e.eventEnd_date = e.eventEnd_date.replaceAll("-", "/");
        }

        e.source = "../media/Icons/participateEvent.svg";
        e.ok = true;
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
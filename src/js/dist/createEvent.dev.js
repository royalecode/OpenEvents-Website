"use strict";

var _basicFunctionalities = require("./basicFunctionalities.js");

(0, _basicFunctionalities.security)();
window.addEventListener('load', loadPage);
var logoutIcon = document.getElementById('logoutIcon');
var app;

function loadPage() {
  logoutIcon.addEventListener('click', logoutCallback);
  app = new Vue({
    el: '#app',
    data: {
      event: {
        name: '',
        files: [],
        date: new Date().toString(),
        location: '',
        description: '',
        eventStart_date: '',
        eventEnd_date: '',
        n_participators: '',
        type: ''
      }
    },
    methods: {
      submit: function submit() {
        createEvent();
      },
      previewFiles: function previewFiles() {
        this.files = this.$refs.myFiles.files;
      }
    }
  });
}

function createEvent() {
  console.log(app.event);
  var token = localStorage.getItem('token');
  var formData = new FormData();
  formData.append('name', app.event.name);
  formData.append('image', app.event.files[0]); //formData.append('date', app.event.date);

  formData.append('location', app.event.location);
  formData.append('description', app.event.description);
  formData.append('eventStart_date', app.event.eventStart_date);
  formData.append('eventEnd_date', app.event.eventEnd_date);
  formData.append('n_participators', app.event.n_participators);
  formData.append('type', app.event.type);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = formData.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;
      console.log(value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  fetch("http://puigmal.salle.url.edu/api/events", {
    method: "POST",
    body: formData,
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) {
      response.json().then(function (error) {
        console.log(error);
      });
    } else {
      console.log("Event creat correctament");
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function logoutCallback() {
  console.log("Logout icon clicked");
  (0, _basicFunctionalities.logoutUser)();
}
"use strict";

window.addEventListener('load', listSearchPageLoad);
var input;
var app;

function listSearchPageLoad() {
  input = document.getElementById('search');
  input.addEventListener('keypress', renderEvents);
  app = new Vue({
    el: '#appSearch',
    data: {
      events: []
    },
    mounted: function mounted() {
      var _this = this;

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
          _this.events = data;
        }
      })["catch"](function (ex) {
        console.log(ex);
      });
    },
    methods: {
      update: function update() {
        var _this2 = this;

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
            _this2.events.length = 0;
            _this2.events = data;
          }
        })["catch"](function (ex) {
          console.log(ex);
        });
      }
    }
  });
  console.log(input.value);
}

function renderEvents(e) {
  if (e.key === 'Enter') {
    app.update();
  }
}
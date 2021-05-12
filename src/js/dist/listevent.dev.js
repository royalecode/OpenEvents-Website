"use strict";

window.addEventListener('load', listPageLoad);

function listPageLoad() {
  var app = new Vue({
    el: '#app',
    data: {
      events: []
    },
    mounted: function mounted() {
      var _this = this;

      fetch("http://puigmal.salle.url.edu/api/events", {
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
    }
  });
}
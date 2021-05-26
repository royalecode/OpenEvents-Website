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
        this.events.map(function (e) {
          if (e.id == event_id && e.ok == true) {
            //addParticipation(event_id);
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

function loadEvents() {
  /*fetch(`http://puigmal.salle.url.edu/api/events/`, {
       method: "GET"
   })
   .then((res) => res.json())
   .then((data) => {
       if(data.length == 0){
           console.log("No hi ha events a la plataforma");
       }else{
           console.log(data);
           data.map((e) => {
               if(!e.image.startsWith("http")){
                   e.image = "http://puigmal.salle.url.edu/img/" + e.image;
                   console.log(e.image);
               }
               console.log(e.image);
               
               e.eventStart_date = e.eventStart_date.split("T")[0];
               e.eventStart_date = e.eventStart_date.replaceAll("-","/");
               e.eventEnd_date = e.eventEnd_date.split("T")[0];
               e.eventEnd_date = e.eventEnd_date.replaceAll("-","/");
               e.source = "../media/Icons/participateEvent.svg";
               e.ok = true;
               return e;
             })
           app.events = data;
       }
   })
   .catch(ex => {
       console.log(ex);
   });*/
  var token = localStorage.getItem('token');
  var listevents = [];
  var assistances = [];
  fetch("http://puigmal.salle.url.edu/api/events", {
    method: "GET"
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("No hi ha events a la plataforma");
    } else {
      data.map(function (m) {
        return listevents.push(m);
      });
      console.log(listevents);
      fetch("http://puigmal.salle.url.edu/api/users/".concat((0, _basicFunctionalities.parseJwt)(token).id, "/assistances"), {
        method: "GET",
        headers: {
          'Authorization': "Bearer ".concat(token)
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.length == 0) {
          console.log("No hi ha assistencies de l'usuari");
          listevents.map(function (e) {
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
          app.events = listevents;
        } else {
          console.log(data);
          data.map(function (m) {
            return assistances.push(m);
          });
          var i = 0;
          var j = 0;
          listevents.forEach(function (f) {
            assistances.forEach(function (e) {
              if (e.id === f.id) {
                i++;
                f.source = "../media/Icons/check.svg";
                f.ok = false;
              } else {
                j++;
                f.source = "../media/Icons/participateEvent.svg";
                f.ok = true;
              }

              if (!f.image.startsWith("http")) {
                f.image = "http://puigmal.salle.url.edu/img/" + f.image;
              }

              if (f.eventStart_date != null) {
                f.eventStart_date = f.eventStart_date.split("T")[0];
                f.eventStart_date = f.eventStart_date.replaceAll("-", "/");
              }

              if (f.eventEnd_date != null) {
                f.eventEnd_date = f.eventEnd_date.split("T")[0];
                f.eventEnd_date = f.eventEnd_date.replaceAll("-", "/");
              }
            });
            console.log(i);
            console.log(j);
            i = 0;
            j = 0;
          });
          app.events = listevents;
        }
      })["catch"](function (ex) {
        console.log(ex);
      });
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
  /*fetch(`http://puigmal.salle.url.edu/api/events/3/assistances`, {
      method: "GET",
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then((res) => res.json())
  .then((data) => {
      if(data.length == 0){
          console.log("No hi assistents a l'event");
      }else{
          console.log(data);
          
      }
  })
  .catch(ex => {
      console.log(ex);
  });*/
}
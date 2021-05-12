import {logoutUser, security } from './basicFunctionalities.js';
security();
window.addEventListener('load', listPageLoad);
let logoutIcon = document.getElementById('logoutIcon');
var app;

function listPageLoad() {
    logoutIcon.addEventListener('click', logoutCallback);

    app = new Vue({
        el: '#app',
        data: {
            events: []
        },
        mounted(){
            loadEvents();
        },
        methods: {
            participate: function (event_id){
                console.log(event_id);
                addParticipation(event_id);
            }
        }
    })
}

function loadEvents(){
    fetch(`http://puigmal.salle.url.edu/api/events/`, {
        method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("No hi ha events a la plataforma");
        }else{
            console.log(data);
            data.map((e) => {
                e.image = "http://puigmal.salle.url.edu/img/" + e.image;
                //console.log(e.image);
                e.eventStart_date = e.eventStart_date.split("T")[0];
                e.eventStart_date = e.eventStart_date.replaceAll("-","/");
                e.eventEnd_date = e.eventEnd_date.split("T")[0];
                e.eventEnd_date = e.eventEnd_date.replaceAll("-","/");
                return e;
              })
            app.events = data;
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

function logoutCallback() {
    console.log("Logout icon clicked");
    logoutUser();
}

function addParticipation(event_id) {
    var token = localStorage.getItem('token');

    fetch(`http://puigmal.salle.url.edu/api/events/${event_id}/assistances`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            response.json().then((error) => {
                console.log(error);
            });
        } else {
            console.log("Participació afegida correctament");
        }
    })
    .catch(ex => {
        console.log(ex);
    });

    fetch(`http://puigmal.salle.url.edu/api/events/2/assistances`, {
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
    });
}

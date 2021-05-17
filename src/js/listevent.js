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
                this.events.map((e) => {
                    if(e.id == event_id && e.ok == true){
                        //addParticipation(event_id);
                        console.log('change icon');
                        e.source = "../media/Icons/check.svg"
                        e.ok = false;
                    }
                    return;
                });
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
                e.source = "../media/Icons/participateEvent.svg";
                e.ok = true;
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
    console.log(event_id);
    fetch(`http://puigmal.salle.url.edu/api/events/${event_id}/assistances`, {
        method: "post",
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


    fetch(`http://puigmal.salle.url.edu/api/events/3/assistances`, {
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

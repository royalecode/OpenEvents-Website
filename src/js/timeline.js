import {logoutUser, security, parseJwt } from './basicFunctionalities.js';
security();
window.addEventListener('load', timelinePageLoad);
let logoutIcon = document.getElementById('logoutIcon');
var app;

function timelinePageLoad() {
    logoutIcon.addEventListener('click', logoutCallback);

    app = new Vue({
        el: '#appTimeline',
        data: {
            events: []
        },
        mounted(){
            loadEventsAssistanceFinished();
        }
    })
}

function loadEventsAssistanceFinished(){
    var token = localStorage.getItem('token');

    fetch(`http://puigmal.salle.url.edu/api/users/${parseJwt(token).id}/assistances/finished`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("No has participat a cap event acabat encara");
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
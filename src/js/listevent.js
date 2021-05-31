import {logoutUser, security, parseJwt } from './basicFunctionalities.js';
import {addParticipation} from './moduleEvent.js'
security();
window.addEventListener('load', listPageLoad);
let logoutIcon = document.getElementById('logoutIcon');
var app;

/**
 * Function called when the page is completely loaded
 */
function listPageLoad() {
    logoutIcon.addEventListener('click', logoutCallback);

    //Vue object to render all the events. We have participate method when users click the Add Icon to particpate on the event
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
                    //Here we control if the event was add to Participate before so we don't add two participations.
                    if(e.id == event_id && e.ok == true){
                        addParticipation(event_id);
                        console.log('change icon');
                        e.source = "../media/Icons/check.svg"; //In case we have added the participation we changed the icon to tell the user the participations has been added.
                        e.ok = false;
                    }
                    return;
                });
            }
        }
    })
}

/**
 * Function that calls the API to get all the Events, and see which ones I am already attached to
 * particpate.
 */
function loadEvents(){
    var token = localStorage.getItem('token');
    let listevents = [];
    let assistances = [];

    //First fetch to get all the events from the platform
    fetch(`http://puigmal.salle.url.edu/api/events`, {
        method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("No hi ha events a la plataforma");
        }else{
            data.map((m) => listevents.push(m));
            //console.log(listevents);

            //Then another fetch to see If as a user I have some participations to events
            fetch(`http://puigmal.salle.url.edu/api/users/${parseJwt(token).id}/assistances`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.length == 0){
                    console.log("No hi ha assistencies de l'usuari");
                    //In case there are no assistances, we check the image url to be ok, and control if date are null and make them handsome
                    listevents.map((e) => {
                        if(!e.image.startsWith("http")){
                            e.image = "http://puigmal.salle.url.edu/img/" + e.image;
                        }
                        if(e.eventStart_date != null){
                            e.eventStart_date = e.eventStart_date.split("T")[0];
                            e.eventStart_date = e.eventStart_date.replaceAll("-","/");
                        }
                        if(e.eventEnd_date != null){
                            e.eventEnd_date = e.eventEnd_date.split("T")[0];
                            e.eventEnd_date = e.eventEnd_date.replaceAll("-","/");
                        }
                        e.source = "../media/Icons/participateEvent.svg";
                        e.ok = true;
                        return e;
                      })
                    app.events = listevents;
                }else{
                    //console.log(data);
                    //If there are assistances we check which events are them, to change the add icon 
                    //with the check icon and disable the action to them
                    
                    data.map((m) => assistances.push(m));
                    listevents.forEach(f => {
                        let found = assistances.find(element => element.id == f.id);
                        if(found){
                            f.source = "../media/Icons/check.svg";
                            f.ok = false;
                        }else{
                            f.source = "../media/Icons/participateEvent.svg";
                            f.ok = true;
                        }

                        //And here the control from the image url and dates.
                        if(!f.image.startsWith("http")){
                            f.image = "http://puigmal.salle.url.edu/img/" + f.image;
                        }
                        if(f.eventStart_date != null){
                            f.eventStart_date = f.eventStart_date.split("T")[0];
                            f.eventStart_date = f.eventStart_date.replaceAll("-","/");
                        }
                        if(f.eventEnd_date != null){
                            f.eventEnd_date = f.eventEnd_date.split("T")[0];
                            f.eventEnd_date = f.eventEnd_date.replaceAll("-","/");
                        }
                    });
                    app.events = listevents; //Save the events to the data vue object.
                }
            })
            .catch(ex => {
                console.log(ex);
            });
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

/**
 * Function that calls the logoutUser function from the basicFunctionalities
 */
function logoutCallback() {
    console.log("Logout icon clicked");
    logoutUser();
}
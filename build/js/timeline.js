import {logoutUser, security, parseJwt } from './basicFunctionalities.js';
security();
window.addEventListener('load', timelinePageLoad);
let logoutIcon = document.getElementById('logoutIcon');
var app;

/**
 * Function called when the page is completely loaded
 */
function timelinePageLoad() {
    logoutIcon.addEventListener('click', logoutCallback);

    //We create the vue object, that will call a function when mounted to fill the data inside.
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

/**
 * Function to load the events I have assisted and they are finished. In my case I have decided that the
 * timeline only needs to have the finished events, that's why if you particpate in a current event
 * it will not be listed on the timeline, only the events that have finished.
 */
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
            data.map((e) => {
                //Controlling if data are null, and spliting the TimeStamp to show the date more handsome
                if(e.eventStart_date != null){
                    e.eventStart_date = e.eventStart_date.split("T")[0];
                    e.eventStart_date = e.eventStart_date.replaceAll("-","/");
                }
                if(e.eventEnd_date != null){
                    e.eventEnd_date = e.eventEnd_date.split("T")[0];
                    e.eventEnd_date = e.eventEnd_date.replaceAll("-","/");
                }
                return e;
              })
            app.events = data;  //Fill the data of the vue object
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
    logoutUser();
}
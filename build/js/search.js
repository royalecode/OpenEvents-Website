import {logoutUser, security } from './basicFunctionalities.js';
import {addParticipation} from './moduleEvent.js'
security();
window.addEventListener('load', listSearchPageLoad);
let logoutIcon = document.getElementById('logoutIcon');
let input;
var app;

/**
 * Function called when the page is completely loaded
 */
function listSearchPageLoad() {
    logoutIcon.addEventListener('click', logoutCallback);
    input = document.getElementById('search');
    input.addEventListener('keypress', renderEvents);

    //Vue object to render all the events. We have two methods, update to render new events or filter
    //the ones presented, and the participate action when users click the Add Icon to particpate on the event
    app = new Vue({
        el: '#appSearch',
        data: {
            events: []
        },
        mounted(){
            loadEvents(false);
        },
        methods: {
            update: function (){
                loadEvents(true);
            },
            participate: function (event_id){
                console.log(event_id);
                this.events.map((e) => {
                    //Here we control if the event was add to Participate before so we don't add two participations.
                    if(e.id == event_id && e.ok == true){
                        addParticipation(event_id);
                        console.log('change icon');
                        e.source = "../media/Icons/check.svg";   //In case we have added the participation we changed the icon to tell the user the participations has been added.
                        e.ok = false;
                    }
                    return;
                });
            }
        }
    })
}

/**
 * Callback function that checks when some key is pressed on the input so in case is an Enter it
 * update the events list on the page.
 * @param {*} e THe event catched
 */
function renderEvents(e){
    if (e.key === 'Enter'){
        app.update();
        input.value = "";
    }
}

/**
 * Function that load the events from the API, as a difference from the home feed of events here we do not control
 * from the start if the I have participations to some events to change the add icon from check icon.
 * In the listevents we are controlling that. In this page we list all the events, and then if you add
 * a participation then we checked that the user can not add the participation to the event two times.
 * @param {*} isFilter Bolean to check if the events must be filtered or not.
 */
function loadEvents(isFilter){
    //First of all, we mount the URL depends of it is filtered or not.
    let url;
    if(isFilter){
        url = `http://puigmal.salle.url.edu/api/events/${input.value}`;
    }else{
        url = `http://puigmal.salle.url.edu/api/events/`;
    }

    fetch(`${url}`, {
        method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("No hi ha events a la plataforma");
        }else{
            console.log(data);
            data.map((e) => {
                //Check if the image is already and url, or we must mount the url
                if(!e.image.startsWith("http")){
                    e.image = "http://puigmal.salle.url.edu/img/" + e.image;
                }
                //Check if some date are nulls, and split them to show more handsome
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
            app.events = data;  //Save the events to the data of vue object
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

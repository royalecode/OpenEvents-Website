import {logoutUser, security } from './basicFunctionalities.js';
security();
window.addEventListener('load', loadPage);
let logoutIcon = document.getElementById('logoutIcon');
var app;

/**
 * Function called when the page is completely loaded
 */
function loadPage() {
    logoutIcon.addEventListener('click', logoutCallback);

    //Here we create the vue object, with a data object event that will get bind with the inputs
    //from the html. Then we have the method submit fro the form that calls createEvent(), and also
    //a method if we want to implement the createEvent with select file image instead of URL.
    app = new Vue({
        el: '#app',
        data: {
            event: {
                name: '',
                //files: [],
                image: '',
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
            submit: function (){
                createEvent();
            },
            previewFiles() {
                this.files = this.$refs.myFiles.files;
            }
        }

    })
}

/**
 * Function that mounts the FormData object to sent to the API to register a new event on the platform.
 */
function createEvent(){
    console.log(app.event);
    var token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', app.event.name);
    //formData.append('image', app.event.files[0]);
    formData.append('image', app.event.image);
    //formData.append('date', app.event.date);
    formData.append('location', app.event.location);
    formData.append('description', app.event.description);
    formData.append('eventStart_date', app.event.eventStart_date);
    formData.append('eventEnd_date', app.event.eventEnd_date);
    formData.append('n_participators', app.event.n_participators);
    formData.append('type', app.event.type);

    for (var value of formData.values()) {
        console.log(value);
    }

    fetch(`http://puigmal.salle.url.edu/api/events`, {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            response.json().then((error) => {
                console.log(error);
                //The fetch is wrong so we tell to the user that there has been an error.
                let response = document.getElementById('checkresponse');
                let text = document.createTextNode('Error al crear el event');
                response.appendChild(text);
                response.removeAttribute('class', 'checkresponse');
                response.setAttribute('class', 'checkresponse-error');
            });
        } else {
            console.log("Event creat correctament");
            //Fetch OK, we tell the user he/she can go back home with the Back Button
            let response = document.getElementById('checkresponse');
            let text = document.createTextNode('Event creat correctament, clicka Back per tornar a la feedback');
            response.appendChild(text);
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
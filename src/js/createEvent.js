import {logoutUser, security } from './basicFunctionalities.js';
security();
window.addEventListener('load', loadPage);
let logoutIcon = document.getElementById('logoutIcon');
var app;

function loadPage() {
    logoutIcon.addEventListener('click', logoutCallback);

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
            });
        } else {
            console.log("Event creat correctament");
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
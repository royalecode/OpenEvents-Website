import { logoutUser, User, parseJwt, security } from './basicFunctionalities.js'
security();

window.addEventListener('load', friendsLoad);
let logoutIcon = document.getElementById('logoutIcon');

function friendsLoad() {
    logoutIcon.addEventListener('click', logoutCallback);
    var token = localStorage.getItem('token');
    
    fetch(`http://puigmal.salle.url.edu/api/friends`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("El usuari no té amics");
        }else{
            console.log(data);
            /*user = new User(data[0]);
            name.placeholder = user.name;
            lastname.placeholder = user.lastname;
            email.placeholder = user.email;
            image.src = `http://puigmal.salle.url.edu/img/${user.image}`;*/
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

fetch(`http://puigmal.salle.url.edu/api/friends/11`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("El usuari no ha enviat be la peticio");
        }else{
            console.log(data);
            /*user = new User(data[0]);
            name.placeholder = user.name;
            lastname.placeholder = user.lastname;
            email.placeholder = user.email;
            image.src = `http://puigmal.salle.url.edu/img/${user.image}`;*/
        }
    })
    .catch(ex => {
        console.log(ex);
    });

    fetch(`http://puigmal.salle.url.edu/api/friends/requests`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("No hi ha requests");
        }else{
            console.log(data);
            /*user = new User(data[0]);
            name.placeholder = user.name;
            lastname.placeholder = user.lastname;
            email.placeholder = user.email;
            image.src = `http://puigmal.salle.url.edu/img/${user.image}`;*/
        }
    })
    .catch(ex => {
        console.log(ex);
    })

    fetch(`http://puigmal.salle.url.edu/api/friends/35`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == 0){
            console.log("acceptar no pot");
        }else{
            console.log(data);
            /*user = new User(data[0]);
            name.placeholder = user.name;
            lastname.placeholder = user.lastname;
            email.placeholder = user.email;
            image.src = `http://puigmal.salle.url.edu/img/${user.image}`;*/
        }
    })
    .catch(ex => {
        console.log(ex);
    });
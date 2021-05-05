import { logoutUser, User, parseJwt, security } from './basicFunctionalities.js'
security();
import { deleteProfile, updateProfile } from './moduleProfile.js';

window.addEventListener('load', profileLoad);

let logoutIcon = document.getElementById('logoutIcon');
let deleteBtn = document.getElementById('deleteBtn');
let saveBtn = document.getElementById('saveBtn');
let name = document.getElementById('name');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let user;

function profileLoad() {
    logoutIcon.addEventListener('click', logoutCallback);
    deleteBtn.addEventListener('click', deleteCallback);
    saveBtn.addEventListener('click', saveCallback);

    let image = document.getElementById('imageProfile');

    var token = localStorage.getItem('token');
    let id;
    if(token){
        id = parseJwt(token).id;
    }
    
    fetch(`http://puigmal.salle.url.edu/api/users/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length == null){
            console.log("La informació de l'usuari no s'ha trobat o bé no existeix cap usuari amb la id corresponent");
        }else{
            console.log(data);
            user = new User(data[0]);
            name.placeholder = user.name;
            lastname.placeholder = user.lastname;
            email.placeholder = user.email;
            image.src = `http://puigmal.salle.url.edu/img/${user.image}`;
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

function deleteCallback() {
    console.log('Delete button clicked');
    deleteProfile();
}

function saveCallback(){
    console.log('Save button clicked');
    let obj = {};
    if(name.value != ""){ obj.name = name.value; }
    if(lastname.value != ""){ obj.last_name = lastname.value; }
    if(email.value != ""){ obj.email = email.value; }

    console.log('Anem a actualitzar el perfil');
    updateProfile(obj);

    if(name.value != ""){ user.name = name.value; }
    if(lastname.value != ""){ user.lastname = lastname.value; }
    if(email.value != ""){ user.email = email.value;}

    name.placeholder = user.name;
    lastname.placeholder = user.lastname;
    email.placeholder = user.email;
    name.value = "";
    lastname.value = "";
    email.value = "";
    
}


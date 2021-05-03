window.addEventListener('load', profileLoad);
let logoutIcon = document.getElementById('logoutIcon');
let deleteBtn = document.getElementById('deleteBtn');
let saveBtn = document.getElementById('saveBtn');
let name = document.getElementById('name');
let email = document.getElementById('email');
let user;
import {logoutUser, deleteProfile, parseJwt, User, updateProfile} from './modules.js';

function profileLoad() {
    logoutIcon.addEventListener('click', logoutCallback);
    deleteBtn.addEventListener('click', deleteCallback);
    saveBtn.addEventListener('click', saveCallback);

    let image = document.getElementById('imageProfile');

    var token = localStorage.getItem('token');
    let id = parseJwt(token).id;
    fetch(`http://puigmal.salle.url.edu/api/users/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.length === 0){
            console.log("La informació de l'usuari no s'ha trobat o bé no existeix cap usuari amb la id corresponent");
        }else{
            user = new User(data[0]);
            name.placeholder = user.fullname;
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
    if(name.value != user.fullname || email.value != user.email){
        if(name.value === "" && email.value === ""){
            console.log('Input no omplerts, no acutalitzem usuari');
            
        }else if (name.value === "" && email.value != ""){
            console.log('Actualitzem nomes el email')
            updateProfile(name.value, email.value, 1);
                user.email = email.value;
                email.placeholder = user.email;
                email.value = "";
                //location.reload();
            

        }else if(name.value != "" && email.value === ""){
            console.log('Actualizem nomes el name');
            updateProfile(name.value, email.value, 0);
                user.name = name.value.split(' ')[0];
                user.last_name = name.value.split(' ')[1];
                name.placeholder = user.name;
                name.value = "";
                //location.reload();
            

        }else {
            console.log('Actualitzem tant el nom com el correu');
            updateProfile(name.value, email.value, 2);
                user.name = name.value.split(' ')[0];
                user.last_name = name.value.split(' ')[1];
                name.placeholder = user.name;
                user.email = email.value;
                email.placeholder = user.email;
                name.value = "";
                email.value = "";
                console.log("hoalahal");
               
                //location.reload();
            
        }
    }
}


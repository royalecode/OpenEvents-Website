import { logoutUser, User, parseJwt, security } from './basicFunctionalities.js'
security(); //Check if the user has authorization to see this page
import { deleteProfile, updateProfile } from './moduleProfile.js';

window.addEventListener('load', profileLoad);

//Save all the Dom elements we will need in the future
let logoutIcon = document.getElementById('logoutIcon');
let deleteBtn = document.getElementById('deleteBtn');
let saveBtn = document.getElementById('saveBtn');
let name = document.getElementById('name');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let user;

/**
 * Callback function when the DOM is rendered. His function is to load from the API the personal 
 * user information, and add the listener to the buttons.
 */
function profileLoad() {
    //Adding click listeners.
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
        if(data.length == null){
            console.log("La informació de l'usuari no s'ha trobat o bé no existeix cap usuari amb la id corresponent");
        }else{
            //The personal user infromation have been recieved and we create an instance of User class
            user = new User(data[0]);
            //We update the placeholders fields with the information recieved.
            name.placeholder = user.name;
            lastname.placeholder = user.lastname;
            email.placeholder = user.email;
            if(user.image){
                image.src = `http://puigmal.salle.url.edu/img/${user.image}`;
            }else{
                image.src = '../media/avatar.png';  //Default image in case the image is null
            }
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

/**
 * Function that calls the deleteProfile function from the moduleFriends. This function is the callback
 * when the users clicks the delete butotn.
 */
function deleteCallback() {
    deleteProfile();
}

/**
 * Callback function when user wants to save the new profile information.
 */
function saveCallback(){
    //Here we create the object with only the form fields that are not empty.
    let obj = {};
    if(name.value != ""){ obj.name = name.value; }
    if(lastname.value != ""){ obj.last_name = lastname.value; }
    if(email.value != ""){ obj.email = email.value; }

    updateProfile(obj); //We call the function that will get the API to save the information.

    //We save the global user with the new profile information.
    if(name.value != ""){ user.name = name.value; }
    if(lastname.value != ""){ user.lastname = lastname.value; }
    if(email.value != ""){ user.email = email.value;}

    /**
     * We update the placeholder from the inputs fields with the new information.
     */
    name.placeholder = user.name;
    lastname.placeholder = user.lastname;
    email.placeholder = user.email;
    name.value = "";
    lastname.value = "";
    email.value = ""; 
}


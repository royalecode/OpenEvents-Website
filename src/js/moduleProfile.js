import {parseJwt} from './basicFunctionalities.js'

/**
 * Function to tell the API we want to delete our own user from the platform. If the process goes
 * well, then we remove the token from the localStorage and we send the client again to the index
 * page as in case he wants to sign up.
 */
function deleteProfile(){
    var token = localStorage.getItem('token');

    fetch("http://puigmal.salle.url.edu/api/users", {
        method: "DELETE",
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
            console.log("Usuari eliminated!");
            localStorage.removeItem('token');
            window.location.replace("../html/index.html");
        }
    })
    .catch(ex => {
        console.log(ex);
    });  
}

/**
 * Function to update the profile with the new information that users has filled in the formulari.
 * @param {*} obj Object recieved only with the profile data that has been changed.
 */
function updateProfile(obj){
    //Here we create the FormData object as the API demands a multipart/formData content.
    const formData = new FormData();
    for ( var key in obj ) {
        formData.append(key, obj[key]);
    }
    console.log(formData);

    var token = localStorage.getItem('token');
    fetch(`http://puigmal.salle.url.edu/api/users/`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
            response.json().then((error) => {
                console.log(error);
            });
        } else {
            console.log("Usuari actualitzat correctament");
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

export {deleteProfile, updateProfile};
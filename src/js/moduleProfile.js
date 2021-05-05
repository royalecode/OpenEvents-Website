import {parseJwt} from './basicFunctionalities.js'

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

function updateProfile(obj){
    const formData = new FormData();
    for ( var key in obj ) {
        formData.append(key, obj[key]);
    }
    console.log(formData);

    var token = localStorage.getItem('token');
    fetch(`http://puigmal.salle.url.edu/api/users/${parseJwt(localStorage.getItem('token')).id}`, {
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
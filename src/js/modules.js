function logoutUser(){
    localStorage.removeItem('token');
    console.log('User has logout from OpenEvents');
}

class User{

    constructor(data){
        this._id = data.id;
        this._name = data.name;
        this._lastname = data.last_name;
        this._email = data.email;
        this._image = data.image;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get lastname(){
        return this._lastname
    }

    get email(){
        return this._email;
    }

    get image(){
        return this._image;
    }

    set name(name){
        this._name = name;
    }

    set lastname(lastname){
        this._lastname = lastname;
    }

    set email(email){
        this._email = email;
    }
}

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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

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

export {logoutUser, deleteProfile, parseJwt, User, updateProfile};
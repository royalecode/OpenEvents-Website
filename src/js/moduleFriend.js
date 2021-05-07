import { User } from './basicFunctionalities.js';

function getMyFriends(){
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
            const users = [];
            data.map((m) => users.push(new User(m)));
            console.log(users)
            users.map((e) => panelFriend(e, 0));
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

function deleteFriendShip(id){
    var token = localStorage.getItem('token');

    fetch(`http://puigmal.salle.url.edu/api/friends/${id}`, {
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
            console.log("Amic eliminat correctament");
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

function requestFriendShip(){
    var token = localStorage.getItem('token');

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
            const users = [];
            data.map((m) => users.push(new User(m)));
            console.log(users)
            users.map((e) => panelFriend(e, 1));
        }
    })
    .catch(ex => {
        console.log(ex);
    })
}

function acceptFriendShip(){
    var token = localStorage.getItem('token');

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
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

function sendFriendShip(){
    var token = localStorage.getItem('token');
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
}

function panelFriend(user, type){

    let archive = document.getElementById('archive');
    let section = document.createElement('section');
    section.setAttribute('class', 'friend');

    let img = document.createElement('img');
    img.setAttribute('class', 'avatar');
    img.setAttribute('alt', 'avatar');
    if(user.image.startsWith('http')){
        img.setAttribute('src', user.image);
    }else if(!user.image){
        img.setAttribute('src', '../media/avatar.png');
    }else{
        let url = 'http://puigmal.salle.url.edu/img/' + user.image;
        img.setAttribute('src', url);
    }

    let info = document.createElement('div');
    info.setAttribute('class', 'info');

    let name = document.createElement('p');
    name.setAttribute('class', 'name');
    let b = document.createElement('b');
    let text1 = document.createTextNode(user.name + " " + user.lastname);
    b.appendChild(text1);
    name.appendChild(b);

    let email = document.createElement('p');
    email.setAttribute('class', 'email');
    let text2 = document.createTextNode(user.email);
    email.appendChild(text2);

    let options = document.createElement('div');
    options.setAttribute('class', 'options');

    let button = document.createElement('button');
    button.setAttribute('class', 'fship');
    button.setAttribute('id', user.id);
    let text3;
    switch(type){
        case 0:
            text3 = document.createTextNode('Following');
            break;
        case 1:
            text3 = document.createTextNode('Accept');
            break;
        case -1:
            text3 = document.createTextNode('Follow');
            break;
        default:
            text3 = document.createTextNode('Follow');
    }
    button.appendChild(text3);
    let chat = document.createElement('img');
    chat.setAttribute('alt', 'chat');
    chat.setAttribute('src', '../media/Icons/chat.svg');
    let del = document.createElement('img');
    del.setAttribute('alt', 'delete');
    del.setAttribute('class', 'delIcon');
    del.setAttribute('src', '../media/Icons/deleteFriendIcon.png');
    del.setAttribute('id', user.id);

    options.appendChild(button);
    options.appendChild(chat);
    options.appendChild(del);

    info.appendChild(name);
    info.appendChild(email);
    info.appendChild(options);

    section.appendChild(img);
    section.appendChild(info);

    archive.appendChild(section);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export { getMyFriends ,deleteFriendShip, requestFriendShip, acceptFriendShip, sendFriendShip,
     panelFriend, removeAllChildNodes};
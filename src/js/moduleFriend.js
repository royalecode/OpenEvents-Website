import { User, parseJwt } from './basicFunctionalities.js';
let type = 0;

function setType(number){
    type = number;
}


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

function acceptFriendShip(id){
    var token = localStorage.getItem('token');

    fetch(`http://puigmal.salle.url.edu/api/friends/${id}`, {
        method: "PUT",
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
            console.log("Peticio d'amistat acceptada correctament");
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

function sendFriendShip(id){
    var token = localStorage.getItem('token');
    fetch(`http://puigmal.salle.url.edu/api/friends/${id}`, {
            method: "POST",
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
                console.log("Enviament d'amistat correcte");
            }
        })
        .catch(ex => {
            console.log(ex);
        });
}

async function exploreNewUsers(){
    var token = localStorage.getItem('token');
    const friends = [];
    const users = [];

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
            data.map((m) => friends.push(new User(m)));
            console.log(friends);

            fetch(`http://puigmal.salle.url.edu/api/users`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.length == 0){
                    console.log("No hi ha usuaris a la platafroma");
                }else{
                    data.map((m) => users.push(new User(m)));

                    const exploreNewUsers = [];
                    users.forEach(e => {
                        friends.forEach(f => {
                            if(e.id != f.id && e.id != parseJwt(token).id){
                                exploreNewUsers.push(e);
                            }
                        })
                    })

                    console.log(exploreNewUsers);
                    exploreNewUsers.map((e) => panelFriend(e, -1));
                }
            })
            .catch(ex => {
                console.log(ex);
            });
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
    section.setAttribute('id', user.id);

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
    button.addEventListener('click', actionBtnPressed);

    let chat = document.createElement('img');
    chat.setAttribute('alt', 'chat');
    chat.setAttribute('src', '../media/Icons/chat.svg');
    if(type != -1){
        let del = document.createElement('img');
        del.setAttribute('alt', 'delete');
        del.setAttribute('class', 'delIcon');
        del.setAttribute('src', '../media/Icons/deleteFriendIcon.png');
        del.setAttribute('id', user.id);
        del.addEventListener('click', delIconPressed);

        options.appendChild(button);
        options.appendChild(chat);
        options.appendChild(del);
    }else{
        options.appendChild(button);
        options.appendChild(chat);
    }

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

function actionBtnPressed(event) {
    console.log(event.target.id + " he clickat el action button");
    switch(type){
        case 0:
            console.log('Ja es el teu amic, la unica opcio que tens és eliminar-lo');
            break;
        case 1:
            acceptFriendShip(event.target.id);
            event.target.innerText = "New Friend";
            console.log(event.target);
            break;
        case -1:
            sendFriendShip(event.target.id);
            event.target.innerText = "Pending";
            console.log(event.target);
            break;
        default:
            console.log('Ja es el teu amic, la unica opcio que tens és eliminar-lo');
    }
}

function delIconPressed(event) {
    console.log(event.target.id + " he clicat eliminar");
    deleteFriendShip(event.target.id);
    document.getElementById(event.target.id).remove();

}

export { getMyFriends ,deleteFriendShip, requestFriendShip, acceptFriendShip, sendFriendShip,
     panelFriend, removeAllChildNodes, exploreNewUsers, setType};
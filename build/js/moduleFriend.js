import { User, parseJwt } from './basicFunctionalities.js';
let type = 0;

/**
 * Setter function to change the global variable type with the value recieved in the parameter
 * @param {*} number New type number that must be changed
 */
function setType(number){
    type = number;
}

/**
 * Function that call the API to get all the friends that user has
 */
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
            //In this case the user has friends so we create an array of user instances, and for each user
            //user we call the panelFriend function.
            let users = [];
            data.forEach((m) => users.push(new User(m)));
            users.forEach((e) => panelFriend(e, 0));
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

/**
 * Function that calls the API to decline a friend request, or if it is already my friend to
 * broke the friendship.
 * @param {*} id User id of the user we want to reject or delete.
 */
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

/**
 * Function that calls the API to know as a user the list of friendship requests I have.
 */
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
            //In case there are requests, we create the instances of user class, and then we call
            //panelFriends that will load the information to the DOM
            const users = [];
            data.forEach((m) => users.push(new User(m)));
            users.forEach((e) => panelFriend(e, 1));
        }
    })
    .catch(ex => {
        console.log(ex);
    })
}

/**
 * Function to tell the API you want to accept a determined request friendship.
 * @param {*} id User id of who do you want to accept the request from.
 */
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

/**
 * Function to call the API the user wants to send a request friendship to another user.
 * @param {*} event Button Event of DOM from the user panel we want to add as a friend.
 */
function sendFriendShip(event){
    var token = localStorage.getItem('token');
    fetch(`http://puigmal.salle.url.edu/api/friends/${event.target.id}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                response.json().then((error) => {
                    //In this case of error, we supposed the requests was already sent so we modify
                    //the message to let the user know what is happening.
                    console.log(error);
                    event.target.innerText = "Already sent";
                });
            } else {
                //The request has been sent, so we tell the user is pending for acception.
                console.log("Enviament d'amistat correcte");
                event.target.innerText = "Pending";
            }
        })
        .catch(ex => {
            console.log(ex);
        });
}

/**
 * Function to call the API we want to get users from the platfrom that may we want to be friends
 * with them.
 */
function exploreNewUsers(){
    var token = localStorage.getItem('token');
    let users = [];

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
            //In case there are users on the platform, we create the array of users instances.
            data.map((m) => users.push(new User(m)));
            
            //In the next block we filter the array, so we don't want to show our own user to the list of possible friends.
            let exploreNewUsers = [];
            exploreNewUsers = users.filter((e) => {
                if(e.id != parseJwt(token).id){
                    return true;
                }
                return false;
            });
            
            //console.log(exploreNewUsers);
            //For each user we call the panelFriend to draw the users into the DOM
            exploreNewUsers.forEach((e) => panelFriend(e, -1));
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

/**
 * Function to draw the user recieved into the DOM
 * @param {*} user User we want to draw
 * @param {*} type The type of user we will draw to personalize the message into the button.
 */
function panelFriend(user, type){

    let archive = document.getElementById('archive');
    let section = document.createElement('section');
    section.setAttribute('class', 'friend');
    section.setAttribute('id', user.id);

    let img = document.createElement('img');
    img.setAttribute('class', 'avatar');
    img.setAttribute('alt', 'avatar');
    if(!user.image){
        img.setAttribute('src', '../media/avatar.png'); //Default image
    }else if(user.image.startsWith('http')){
        img.setAttribute('src', user.image);    //Web Image    
    }else{
        let url = 'http://puigmal.salle.url.edu/img/' + user.image;     //Matagalls Image           
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
    //Here we personalize the button message as the type indicates.
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
        del.setAttribute('src', '../media/Icons/delete.svg');
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

/**
 * Function to remove all the child elements in the DOM inside the element recieved in parameter.
 * @param {*} parent Dom element that needs to remove all his childs.
 */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Callback function called when the user click the blue button from some user in the view. It controls
 * in which type we are now, so if it is 0 it means we are on the myFriends view. Case 1 we are
 * on the requests Page and finally the case -1 we are on the exploreNewUsers Page.
 * @param {*} event 
 */
function actionBtnPressed(event) {
    switch(type){
        case 0:
            console.log('Is your friend already');
            break;
        case 1:
            acceptFriendShip(event.target.id);
            event.target.innerText = "New Friend";
            console.log(event.target);
            break;
        case -1:
            sendFriendShip(event);
            console.log(event.target);
            break;
        default:
            console.log('Is your friend already');
    }
}

/**
 * Callback function called when the delete Icon is pressed. It recieves the event from the click and
 * then it calls the deleteFriendShip function to tell the API, and also remove the user panel from the
 * view.
 * @param {*} event Event from the click to the deleteIcon
 */
function delIconPressed(event) {
    deleteFriendShip(event.target.id);
    document.getElementById(event.target.id).remove();
}

export { getMyFriends , requestFriendShip, removeAllChildNodes, exploreNewUsers, setType};
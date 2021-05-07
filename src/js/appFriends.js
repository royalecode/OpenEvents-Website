import { logoutUser, User, parseJwt, security } from './basicFunctionalities.js'
security();
import {getMyFriends, deleteFriendShip, requestFriendShip, acceptFriendShip,
     sendFriendShip, exploreNewUsers, removeAllChildNodes, setType} from './moduleFriend.js';

window.addEventListener('load', friendsLoad);
let logoutIcon = document.getElementById('logoutIcon');
let archive = document.getElementById('archive');
let myFriendsBtn = document.getElementById('myFriendsBtn');
let requestsBtn = document.getElementById('requestsBtn');
let exploreBtn = document.getElementById('exploreBtn');

myFriendsBtn.addEventListener('click', friendsCallback);
requestsBtn.addEventListener('click', requestsCallback);
exploreBtn.addEventListener('click', exploreCallback);

function friendsLoad() {
    setType(0);
    myFriendsBtn.className = "buttonSelected";
    logoutIcon.addEventListener('click', logoutCallback);
    getMyFriends();
}

function logoutCallback() {
    console.log("Logout icon clicked");
    logoutUser();
}

function friendsCallback() {
    setType(0);
    removeAllChildNodes(archive);
    exploreBtn.className = "button";
    myFriendsBtn.className = "buttonSelected";
    requestsBtn.className = "button";
    getMyFriends();
}

function requestsCallback() {
    setType(1);
    removeAllChildNodes(archive);
    exploreBtn.className = "button";
    myFriendsBtn.className = "button";
    requestsBtn.className = "buttonSelected";
    requestFriendShip();
}

function exploreCallback() {
    setType(-1);
    removeAllChildNodes(archive);
    exploreBtn.className = "buttonSelected";
    myFriendsBtn.className = "button";
    requestsBtn.className = "button";
    exploreNewUsers();
}
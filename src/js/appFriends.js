import { logoutUser, User, parseJwt, security } from './basicFunctionalities.js'
security();
import {getMyFriends, deleteFriendShip, requestFriendShip, acceptFriendShip, sendFriendShip, panelFriend} from './moduleFriend.js';

window.addEventListener('load', friendsLoad);
let logoutIcon = document.getElementById('logoutIcon');

function friendsLoad() {
    logoutIcon.addEventListener('click', logoutCallback);
    
    getMyFriends();
    
}

function logoutCallback() {
    console.log("Logout icon clicked");
    logoutUser();
}
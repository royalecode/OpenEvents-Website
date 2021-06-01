import { logoutUser, security } from './basicFunctionalities.js'
security(); //Check if the user has authorization to see this page
import {getMyFriends, requestFriendShip, exploreNewUsers, 
    removeAllChildNodes, setType} from './moduleFriend.js';

window.addEventListener('load', friendsLoad);
//Save all the Dom elements we will need in the future
let logoutIcon = document.getElementById('logoutIcon');
let archive = document.getElementById('archive');
let myFriendsBtn = document.getElementById('myFriendsBtn');
let requestsBtn = document.getElementById('requestsBtn');
let exploreBtn = document.getElementById('exploreBtn');

//Add the click listeners to the filter buttons.
myFriendsBtn.addEventListener('click', friendsCallback);
requestsBtn.addEventListener('click', requestsCallback);
exploreBtn.addEventListener('click', exploreCallback);

/**
 * Callback function called when the dom is rendered, the default type is 0. We add a new class to
 * the filterButton to show it is selected, and call the function that will draw the friends users
 * to the page.
 */
function friendsLoad() {
    setType(0);
    myFriendsBtn.className = "buttonSelected";
    logoutIcon.addEventListener('click', logoutCallback);   //Listener to the logoutButton
    getMyFriends();
}

/**
 * Function that calls the logoutUser function from the basicFunctionalities
 */
function logoutCallback() {
    console.log("Logout icon clicked");
    logoutUser();
}

/**
 * Function to reload my friends when filter is selected.
 */
function friendsCallback() {
    setType(0);
    removeAllChildNodes(archive); //Remove the previous users to draw again all my friends again.
    exploreBtn.className = "button";
    myFriendsBtn.className = "buttonSelected";
    requestsBtn.className = "button";
    getMyFriends();
}

/**
 * Function to load the requests friends into the page and set selected filter button to request button.
 */
function requestsCallback() {
    setType(1);
    removeAllChildNodes(archive);   //Remove the previous users to draw again all the requests users array
    exploreBtn.className = "button";
    myFriendsBtn.className = "button";
    requestsBtn.className = "buttonSelected";
    requestFriendShip();
}

/**
 * Function to load new possible friends users, would be the explore page.
 */
function exploreCallback() {
    setType(-1);
    removeAllChildNodes(archive); //Remove the previous users to draw again all the explore users.
    exploreBtn.className = "buttonSelected";
    myFriendsBtn.className = "button";
    requestsBtn.className = "button";
    exploreNewUsers();
}
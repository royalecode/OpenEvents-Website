"use strict";

var _basicFunctionalities = require("./basicFunctionalities.js");

var _moduleFriend = require("./moduleFriend.js");

(0, _basicFunctionalities.security)(); //Check if the user has authorization to see this page

window.addEventListener('load', friendsLoad); //Save all the Dom elements we will need in the future

var logoutIcon = document.getElementById('logoutIcon');
var archive = document.getElementById('archive');
var myFriendsBtn = document.getElementById('myFriendsBtn');
var requestsBtn = document.getElementById('requestsBtn');
var exploreBtn = document.getElementById('exploreBtn'); //Add the click listeners to the filter buttons.

myFriendsBtn.addEventListener('click', friendsCallback);
requestsBtn.addEventListener('click', requestsCallback);
exploreBtn.addEventListener('click', exploreCallback);
/**
 * Callback function called when the dom is rendered, the default type is 0. We add a new class to
 * the filterButton to show it is selected, and call the function that will draw the friends users
 * to the page.
 */

function friendsLoad() {
  (0, _moduleFriend.setType)(0);
  myFriendsBtn.className = "buttonSelected";
  logoutIcon.addEventListener('click', logoutCallback); //Listener to the logoutButton

  (0, _moduleFriend.getMyFriends)();
}
/**
 * Function that calls the logoutUser function from the basicFunctionalities
 */


function logoutCallback() {
  console.log("Logout icon clicked");
  (0, _basicFunctionalities.logoutUser)();
}
/**
 * Function to reload my friends when filter is selected.
 */


function friendsCallback() {
  (0, _moduleFriend.setType)(0);
  (0, _moduleFriend.removeAllChildNodes)(archive); //Remove the previous users to draw again all my friends again.

  exploreBtn.className = "button";
  myFriendsBtn.className = "buttonSelected";
  requestsBtn.className = "button";
  (0, _moduleFriend.getMyFriends)();
}
/**
 * Function to load the requests friends into the page and set selected filter button to request button.
 */


function requestsCallback() {
  (0, _moduleFriend.setType)(1);
  (0, _moduleFriend.removeAllChildNodes)(archive); //Remove the previous users to draw again all the requests users array

  exploreBtn.className = "button";
  myFriendsBtn.className = "button";
  requestsBtn.className = "buttonSelected";
  (0, _moduleFriend.requestFriendShip)();
}
/**
 * Function to load new possible friends users, would be the explore page.
 */


function exploreCallback() {
  (0, _moduleFriend.setType)(-1);
  (0, _moduleFriend.removeAllChildNodes)(archive); //Remove the previous users to draw again all the explore users.

  exploreBtn.className = "buttonSelected";
  myFriendsBtn.className = "button";
  requestsBtn.className = "button";
  (0, _moduleFriend.exploreNewUsers)();
}
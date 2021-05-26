"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMyFriends = getMyFriends;
exports.requestFriendShip = requestFriendShip;
exports.removeAllChildNodes = removeAllChildNodes;
exports.exploreNewUsers = exploreNewUsers;
exports.setType = setType;

var _basicFunctionalities = require("./basicFunctionalities.js");

var type = 0;

function setType(number) {
  type = number;
}

function getMyFriends() {
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/friends", {
    method: "GET",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("El usuari no té amics");
    } else {
      console.log(data);
      var users = [];
      data.map(function (m) {
        return users.push(new _basicFunctionalities.User(m));
      });
      console.log(users);
      users.map(function (e) {
        return panelFriend(e, 0);
      });
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function deleteFriendShip(id) {
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/friends/".concat(id), {
    method: "DELETE",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) {
      response.json().then(function (error) {
        console.log(error);
      });
    } else {
      console.log("Amic eliminat correctament");
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function requestFriendShip() {
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/friends/requests", {
    method: "GET",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("No hi ha requests");
    } else {
      var users = [];
      data.map(function (m) {
        return users.push(new _basicFunctionalities.User(m));
      });
      console.log(users);
      users.map(function (e) {
        return panelFriend(e, 1);
      });
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function acceptFriendShip(id) {
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/friends/".concat(id), {
    method: "PUT",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) {
      response.json().then(function (error) {
        console.log(error);
      });
    } else {
      console.log("Peticio d'amistat acceptada correctament");
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function sendFriendShip(id, event) {
  var token = localStorage.getItem('token');
  fetch("http://puigmal.salle.url.edu/api/friends/".concat(id), {
    method: "POST",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (response) {
    if (!response.ok) {
      response.json().then(function (error) {
        console.log(error);
        console.log('Ja li havies enviat una peticio');
        event.target.innerText = "Already sent";
      });
    } else {
      console.log("Enviament d'amistat correcte");
      event.target.innerText = "Pending";
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function exploreNewUsers() {
  var token = localStorage.getItem('token');
  var friends = [];
  var users = [];
  fetch("http://puigmal.salle.url.edu/api/friends", {
    method: "GET",
    headers: {
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.length == 0) {
      console.log("El usuari no té amics");
    } else {
      data.map(function (m) {
        return friends.push(new _basicFunctionalities.User(m));
      });
      console.log(friends);
      fetch("http://puigmal.salle.url.edu/api/users", {
        method: "GET",
        headers: {
          'Authorization': "Bearer ".concat(token)
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.length == 0) {
          console.log("No hi ha usuaris a la platafroma");
        } else {
          data.map(function (m) {
            return users.push(new _basicFunctionalities.User(m));
          });
          /*const exploreNewUsers = [];
          users.forEach(e => {
              friends.forEach(f => {
                  if(e.id != f.id && e.id != parseJwt(token).id){
                      //exploreNewUsers.push(e);
                      users.remove(e);
                  }
              })
          })*/
          //let result = [];
          //let istopush = false;

          friends.forEach(function (e) {
            users.filter(function (f) {
              if (f.id != e.id && f.id != (0, _basicFunctionalities.parseJwt)(token).id) {
                return f;
              } else {
                console.log(e.id);
                console.log(f.id);
              }
            });
          });
          console.log(users); //console.log(exploreNewUsers);
          //exploreNewUsers.map((e) => panelFriend(e, -1));

          users.map(function (e) {
            return panelFriend(e, -1);
          });
        }
      })["catch"](function (ex) {
        console.log(ex);
      });
    }
  })["catch"](function (ex) {
    console.log(ex);
  });
}

function panelFriend(user, type) {
  var archive = document.getElementById('archive');
  var section = document.createElement('section');
  section.setAttribute('class', 'friend');
  section.setAttribute('id', user.id);
  var img = document.createElement('img');
  img.setAttribute('class', 'avatar');
  img.setAttribute('alt', 'avatar');

  if (user.image.startsWith('http')) {
    img.setAttribute('src', user.image);
  } else if (!user.image) {
    img.setAttribute('src', '../media/avatar.png');
  } else {
    var url = 'http://puigmal.salle.url.edu/img/' + user.image;
    img.setAttribute('src', url);
  }

  var info = document.createElement('div');
  info.setAttribute('class', 'info');
  var name = document.createElement('p');
  name.setAttribute('class', 'name');
  var b = document.createElement('b');
  var text1 = document.createTextNode(user.name + " " + user.lastname);
  b.appendChild(text1);
  name.appendChild(b);
  var email = document.createElement('p');
  email.setAttribute('class', 'email');
  var text2 = document.createTextNode(user.email);
  email.appendChild(text2);
  var options = document.createElement('div');
  options.setAttribute('class', 'options');
  var button = document.createElement('button');
  button.setAttribute('class', 'fship');
  button.setAttribute('id', user.id);
  var text3;

  switch (type) {
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
  var chat = document.createElement('img');
  chat.setAttribute('alt', 'chat');
  chat.setAttribute('src', '../media/Icons/chat.svg');

  if (type != -1) {
    var del = document.createElement('img');
    del.setAttribute('alt', 'delete');
    del.setAttribute('class', 'delIcon');
    del.setAttribute('src', '../media/Icons/delete.svg');
    del.setAttribute('id', user.id);
    del.addEventListener('click', delIconPressed);
    options.appendChild(button);
    options.appendChild(chat);
    options.appendChild(del);
  } else {
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

  switch (type) {
    case 0:
      console.log('Ja es el teu amic, la unica opcio que tens és eliminar-lo');
      break;

    case 1:
      acceptFriendShip(event.target.id);
      event.target.innerText = "New Friend";
      console.log(event.target);
      break;

    case -1:
      sendFriendShip(event.target.id, event);
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
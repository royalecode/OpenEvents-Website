"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutUser = logoutUser;
exports.parseJwt = parseJwt;
exports.security = security;
exports.checkUserHasCredentials = checkUserHasCredentials;
exports.User = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Function to remove the token from the localStorage
 */
function logoutUser() {
  localStorage.removeItem('token');
  console.log('User has logout from OpenEvents');
}
/**
 * User class with his constructor, so the data recieved from the API will be treated as instances
 * of user and not as normal objects.
 */


var User =
/*#__PURE__*/
function () {
  function User(data) {
    _classCallCheck(this, User);

    this._id = data.id;
    this._name = data.name;
    this._lastname = data.last_name;
    this._email = data.email;
    this._image = data.image;
  }

  _createClass(User, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
    }
  }, {
    key: "lastname",
    get: function get() {
      return this._lastname;
    },
    set: function set(lastname) {
      this._lastname = lastname;
    }
  }, {
    key: "email",
    get: function get() {
      return this._email;
    },
    set: function set(email) {
      this._email = email;
    }
  }, {
    key: "image",
    get: function get() {
      return this._image;
    }
  }]);

  return User;
}();
/**
 * Function to parse the payload inside the json token, as the API in some endpoint needs to recieve the id from the User
 * @param {*} token Token we need to parse
 * @returns The payload object.
 */


exports.User = User;

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

;
/**
 * Function that is called first in almost all the pages to control if the user has authorization to access
 * that page, in case the user hasn't a token it will be redirected to the incial page of OpenEvents.
 */

function security() {
  if (!localStorage.getItem('token')) {
    console.log("El usuari intentava entrar a la pàgina sense prèviament haver-se registrar o loggejat");
    window.location.replace("../html/index.html");
  }
}

function checkUserHasCredentials() {
  if (localStorage.getItem('token')) {
    console.log("El usuari te credencials guardades i pot accedir directament a la Home");
    window.location.replace("../html/listevent.html");
  }
}
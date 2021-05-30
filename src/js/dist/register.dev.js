"use strict";

window.addEventListener('load', pageLoaded); //When the Dom is rendered we apply the callback

function pageLoaded() {
  console.log('Page loaded');
  var form = document.forms.namedItem("register");
  form.addEventListener("submit", function _callee(event) {
    var formData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault(); // Create a FormData passing the form by parameters

            formData = new FormData(this); // If you want to view the values in the FormData you can interate on them

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;

            for (_iterator = formData.values()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              value = _step.value;
              console.log(value);
            }

            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 13:
            _context.prev = 13;
            _context.prev = 14;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 16:
            _context.prev = 16;

            if (!_didIteratorError) {
              _context.next = 19;
              break;
            }

            throw _iteratorError;

          case 19:
            return _context.finish(16);

          case 20:
            return _context.finish(13);

          case 21:
            fetch("http://puigmal.salle.url.edu/api/users", {
              method: "post",
              body: formData
            }).then(function (response) {
              if (!response.ok) {
                response.json().then(function (error) {
                  //Something wrong with the register so we let the user in the view know what is happening.
                  console.log(error);
                  p = document.getElementById('errResponse');
                  p.innerHTML = "";
                  t = document.createTextNode("Something wrong with data, or maybe try to login");
                  p.appendChild(t);
                });
              } else {
                response.json().then(function (data) {
                  //The register has gone well so we redirect the user to the login Page.
                  console.log("Usari registrat correctament");
                  window.location.replace("../html/login.html");
                });
              }
            })["catch"](function (ex) {
              console.log(ex);
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, this, [[5, 9, 13, 21], [14,, 16, 20]]);
  });
}
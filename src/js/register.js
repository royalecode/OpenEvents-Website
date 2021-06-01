import {checkUserHasCredentials} from './basicFunctionalities.js';
checkUserHasCredentials();
window.addEventListener('load', pageLoaded); //When the Dom is rendered we apply the callback

function pageLoaded() {
    const form = document.forms.namedItem("register");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        // Create a FormData passing the form by parameters
        const formData = new FormData(this);

        fetch("http://puigmal.salle.url.edu/api/users", {
            method: "post",
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                response.json().then((error) => {
                    //Something wrong with the register so we let the user in the view know what is happening.
                    console.log(error);
                    p = document.getElementById('errResponse');
                    p.innerHTML = "";
                    t = document.createTextNode("Something wrong with data, or maybe try to login");
                    p.appendChild(t);
                });
            } else {
                response.json().then((data) => {
                    //The register has gone well so we redirect the user to the login Page.
                    console.log("Usari registrat correctament");
                    window.location.replace("../html/login.html");
                });
            }
        })
        .catch(ex => {
            console.log(ex);
        });        
    });
}

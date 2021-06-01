import {checkUserHasCredentials} from './basicFunctionalities.js';
checkUserHasCredentials();
window.addEventListener('load', loginLoaded); //When the Dom is rendered we apply the callback

function loginLoaded() {
    
    let token;
    let p = document.getElementById('errors');
    var loginButton = document.getElementById('login-button');  //Listener to the loginButton
    loginButton.addEventListener('click', () => {

        //We create the object with the infromation in the form
        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('pwd').value
        };

        //We validate that the information introduced is valid or there is missing fields
        if(data.email === "" || data.password === ""){
            p.innerHTML = "";
            let t = document.createTextNode("Missing one or two fields");
            p.appendChild(t); 
        }else{
            //If it is all correct we call the API to validate the login
            fetch("http://puigmal.salle.url.edu/api/users/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then((data) => {
                token = data.accessToken;
                localStorage.setItem('token', token);
                if(token){
                    //The API has validate the user so we redirect him to the Home Page of the Feed Events.
                    window.location.replace("../html/listevent.html");
                }else{
                    //Something wrong, so we show an error message to the view.
                    p.innerHTML = "";
                    let t = document.createTextNode("Login incorrect, have you tried to sign up?");
                    p.appendChild(t); 
                }
            })
            .catch(ex => {
                console.log(ex);
            });
            
        }
    });
}
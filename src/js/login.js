window.addEventListener('load', loginLoaded);

function loginLoaded() {
    console.log('Page loaded');
    //const form = document.getElementsByName('login-form')
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('pwd').value
    };

    let token;

    var loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {

    fetch("http://puigmal.salle.url.edu/api/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.accessToken);
        token = data.accessToken;
    })
    .catch(ex => {
        console.log("error al post login")
    });
    window.open("../html/listevent.html");
    //window.location.replace("../html/listevent.html");
    });
}
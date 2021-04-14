window.addEventListener('load', pageLoaded);

function registerUser(event) {
    console.log("hola");
    //let imageFile = getBase64Image("https://sites.google.com/site/paris20151905/_/rsrc/1472871434925/imatges/1216_paris-en-otono.jpg");
    const user = {
        image: "https://sites.google.com/site/paris20151905/_/rsrc/1472871434925/imatges/1216_paris-en-otono.jpg",
        name: document.getElementById('fname').value,
        last_name: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('pwd').value,
    };
    console.log(user);
    console.log(JSON.stringify(user));

    fetch("http://puigmal.salle.url.edu/api/users ", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then(function(response) {
        console.log(response.status); // Will show you the status
        if (!response.ok) {
            throw Error("HTTP status " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

    event.preventDefault();
    window.open("../html/login.html");
}

function pageLoaded() {
    console.log('Page loaded');
    const form = document.getElementById('register-form');
    form.addEventListener('submit', registerUser);
}

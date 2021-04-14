window.addEventListener('load', pageLoaded);

function registerUser(event) {
    
    console.log("hola");
    // const user = {
    //     image: document.getElementById('file').value,
    //     name: document.getElementById('fname').value,
    //     last_name: document.getElementById('lname').value,
    //     email: document.getElementById('email').value,
    //     password: document.getElementById('pwd').value,
    // };
    // console.log(user);
    //formElement = document.getElementById('register-form');
    var formData = new FormData();
    formData.append('image', document.getElementById('file').files[0]);
    formdata.append('name', document.getElementById('fname').value);
    formData.append('last_name', document.getElementById('lname').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('password', document.getElementById('pwd').value);
    console.log(...formData);
    //console.log(JSON.stringify(user));
    
    fetch("http://puigmal.salle.url.edu/api/users ", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: formData,
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
    //window.open("../html/login.html");
}

function pageLoaded() {
    console.log('Page loaded');
    const form = document.getElementById('register-form');
    form.addEventListener('submit', registerUser);
}

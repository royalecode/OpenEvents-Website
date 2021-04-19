window.addEventListener('load', loginLoaded);

function loginLoaded() {
    console.log('Page loaded');
    
    let token;
    var loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('pwd').value
        };

        if(data.email === "" || data.password === ""){
            let p = document.getElementById('errors');
            let t = document.createTextNode("Te falta introducir uno de los campos");
            p.appendChild(t); 
        }else{
        
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
                localStorage.setItem('token', token);
            })
            .catch(ex => {
                console.log(ex);
            });
            
            window.location.replace("../html/listevent.html");
        }
    });
}
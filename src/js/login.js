window.addEventListener('load', loginLoaded);

function loginLoaded() {
    console.log('Page loaded');
    
    let token;
    let p = document.getElementById('errors');
    var loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('pwd').value
        };

        if(data.email === "" || data.password === ""){
            p.innerHTML = "";
            let t = document.createTextNode("Missing one or two fields");
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
                if(token){
                    window.location.replace("../html/listevent.html");
                }else{
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
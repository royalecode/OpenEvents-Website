window.addEventListener('load', pageLoaded);

function pageLoaded() {
    console.log('Page loaded');
    const form = document.forms.namedItem("register");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        // Create a FormData passing the form by parameters
        const formData = new FormData(this);
        // If you want to view the values in the FormData you can interate on them
        for (var value of formData.values()) {
            console.log(value);
        }

        fetch("http://puigmal.salle.url.edu/api/users", {
            method: "post",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(ex => {
            console.log(ex);
        });

        window.location.replace("../html/login.html");
        
    });
}

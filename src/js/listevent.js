window.addEventListener('load', listPageLoad);

function listPageLoad() {
    var token = localStorage.getItem('token');
    console.log(token);
}

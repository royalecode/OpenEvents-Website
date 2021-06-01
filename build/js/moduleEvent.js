/**
 * Function that calls the API to add a Participation as a user to the event passed by argument.
 * @param {*} event_id Event id of the one I want to assist
 */
function addParticipation(event_id) {
    var token = localStorage.getItem('token');
    fetch(`http://puigmal.salle.url.edu/api/events/${event_id}/assistances`, {
        method: "post",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            response.json().then((error) => {
                console.log(error);
            });
        } else {
            console.log("Participació afegida correctament");
        }
    })
    .catch(ex => {
        console.log(ex);
    });
}

export { addParticipation };
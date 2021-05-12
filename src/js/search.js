window.addEventListener('load', listSearchPageLoad);
let input;
var app;

function listSearchPageLoad() {
    input = document.getElementById('search');
    input.addEventListener('keypress', renderEvents);

    app = new Vue({
        el: '#appSearch',
        data: {
            events: [
    
            ]
        },
        mounted(){
    
            fetch(`http://puigmal.salle.url.edu/api/events/`, {
                method: "GET"
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.length == 0){
                    console.log("No hi ha events a la plataforma");
                }else{
                    console.log(data);
                    data.map((e) => {
                        e.image = "http://puigmal.salle.url.edu/img/" + e.image;
                        //console.log(e.image);
                        e.eventStart_date = e.eventStart_date.split("T")[0];
                        e.eventStart_date = e.eventStart_date.replaceAll("-","/");
                        e.eventEnd_date = e.eventEnd_date.split("T")[0];
                        e.eventEnd_date = e.eventEnd_date.replaceAll("-","/");
                        return e;
                      })
                    this.events = data;
                }
            })
            .catch(ex => {
                console.log(ex);
            });  
        },
        methods: {
            update: function (){
                fetch(`http://puigmal.salle.url.edu/api/events/${input.value}`, {
                    method: "GET"
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.length == 0){
                        console.log("No hi ha events a la plataforma");
                    }else{
                        console.log(data);
                        data.map((e) => {
                            e.image = "http://puigmal.salle.url.edu/img/" + e.image;
                            //console.log(e.image);
                            e.eventStart_date = e.eventStart_date.split("T")[0];
                            e.eventStart_date = e.eventStart_date.replaceAll("-","/");
                            e.eventEnd_date = e.eventEnd_date.split("T")[0];
                            e.eventEnd_date = e.eventEnd_date.replaceAll("-","/");
                            return e;
                          })
                        this.events.length = 0;
                        this.events = data;
                    }
                })
                .catch(ex => {
                    console.log(ex);
                });  
            }
            
        }
    })
    console.log(input.value);
}

function renderEvents(e){
    if (e.key === 'Enter'){
        app.update();
    }
}

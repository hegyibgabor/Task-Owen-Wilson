



const app = new Vue({
    el: '#movie-selector',
   
    data: {
        moviename: " ",
        responseAvailable: false,
    },
    methods: {
        fetchAPIData( ) { 
            this.responseAvailable = false;
fetch("https://owen-wilson-wow-api.herokuapp.com/wows/random", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "owen-wilson-wow-api.herokuapp.com/wows/random",
        "x-rapidapi-key": this.apiKey
    }
})
.then(response => { 
    if(response.ok){
        return response.json()    
    } else{
        alert("Server returned " + response.status + " : " + response.statusText);
    }                
})
.then(response => {
    this.moviename = response.movie; 
    this.responseAvailable = true;
})
.catch(err => {
    console.log(err);
});
        }
    }
})

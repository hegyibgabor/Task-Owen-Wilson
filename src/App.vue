<template>
  <div class="sidebar">
      <p>Mentett film</p>
      <div v-if="saved_name">
    <div @click="loadMovie" class = "side-container">
      <img :src="saved_img"/>
      <p>{{saved_name}}</p>
      <p>{{saved_year}}</p>
    </div>
    <button @click="deleteMovie" id = "load">Törlés</button>
    </div>
	</div>
  <div class="movie-selector">
    <div v-if="img">  
    <img :src="img" class = "selector-img" />
    </div>
		<div class="movie-data">
      <div v-if="movie_name">
        <h2>{{movie_name}}</h2>
      </div>
      <div v-if="year">
        <p>{{year}}</p>
      </div>
      <div v-if="director">
        <p>Rendező:<br/>{{director}}</p>
      </div>
			<div v-if="wows">
        <p> Összes <b>wow</b> a filmben:<br/>{{wows}}</p>
      </div>
      <div v-if="audio">
			<audio :src="audio" controls></audio>
        <button @click="saveAndLoad" id = "save">Mentés</button>
      </div>
    </div>
	</div>
  <button @click="nextMovie" id = "next" >Tovább</button>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from 'axios';
export default {
  name: 'App',
  components: {
    
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data(){ //Változók VUE-hoz
    return {
      movie_name: null,
      saved_name: null,
      year: null,
      saved_year: null, 
      director: null,
      wows: null,
      img: null,
      saved_img: null,
      audio: null,
      selected: null,
      link_load: null,
      link_def: null,
    }
  },
  created(){ //Oldal inicializálása
    this.loadSavedMovie();
  },
  methods: {
    saveAndLoad(){
      this.saveCookie();
      this.loadSavedMovie();
    },
    saveCookie(){
      this.cookies.set("saved1", this.movie_name);
    },
    loadMovie(){ //Betölti a main frame-be a filmet
      this.link_def = this.link_load;
      this.showWow();
    },
    nextMovie(){
      this.link_def = "https://owen-wilson-wow-api.herokuapp.com/wows/random?";
      this.showWow()
    },
    deleteMovie(){
        this.saved_name = this.saved_img = this.saved_year = null;
    },
    async loadSavedMovie(){ 

        this.link_load = "https://owen-wilson-wow-api.herokuapp.com/wows/random?movie=" + this.cookies.get("saved1", this.movie_name);

      await axios.get(this.link_load )
      .then(response => {
        (this.saved_name = response.data[0].movie),
        (this.saved_img = response.data[0].poster),
        (this.saved_year = response.data[0].year)
      })
      .catch(error => console.log(error))
    },
     async showWow(){ //axios api kérés
      let config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      await axios.get(this.link_def,config)
      .then(response => {
        (this.movie_name = response.data[0].movie),
        (this.year = response.data[0].release_date),
        (this.img = response.data[0].poster),
        (this.director = response.data[0].director),
        (this.wows = response.data[0].total_wows_in_movie),
        (this.audio = response.data[0].audio)

      })
      .catch(error => console.log(error))

    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

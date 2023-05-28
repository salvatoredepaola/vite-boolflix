<script>
import { store } from '../data/store';
import axios from 'axios';

export default {
    name: 'BaseMain',
    data() {
        return {
            store
        }
    },
    methods: {
        avviaRicercaFilms() {
            console.log("ricerca: ", this.store.searchText)

            const movieSearchEndPoint = `${this.store.apiUrl}movie?api_key=${this.store.apiKey}&query=${this.store.searchText}`;

            axios.get(movieSearchEndPoint).then(result => {
                console.log("film: ", result.data.results);
                this.store.movies = result.data.results
            })

        },
        avviaRicercaSeries() {
            const tvSearchEndPoint = `${this.store.apiUrl}tv?api_key=${this.store.apiKey}&query=${this.store.searchText}`;

            axios.get(tvSearchEndPoint).then(result => {
                console.log("serie: ", result.data.results);
                this.store.series = result.data.results
            })
        },
    },
    mounted() {

    }
}
</script>

<template>

<main>
    <div class=" mt-5">
        <input @keyup.enter="avviaRicercaFilms(),avviaRicercaSeries()" type="text" v-model="store.searchText">
        <button @click="avviaRicercaFilms(),avviaRicercaSeries()">DEBUG</button>
        <h2 class="text-light">FILM</h2>
        <div class="row">
            <div class="col d-flex flex-wrap">
                <!-- <div v-for="film in this.store.movies" class="my_card">
                    <h4>{{ film.title }}</h4>
                    <h5>{{ film.original_title }}</h5>
                    <p>{{ film.original_language }}</p>
                    <p>{{ film.vote_average }}</p>
                </div> -->
                <div v-for="movie in this.store.movies" class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <img :src="`${this.store.imgApiUrl}${movie.backdrop_path}`" alt="Paris">
                        </div>
                        <div class="flip-box-back">
                            <h4>Titolo: {{ movie.title }}</h4>
                            <h5>titolo originale: {{ movie.original_title }}</h5>
                            <p>Lingua: {{ movie.original_language }}</p>
                            <p>Voto: {{ movie.vote_average }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 class="text-light">SERIE</h2>
        <div class="row">
            <div class="col d-flex flex-wrap">
                <!-- <div v-for="serie in this.store.series" class="my_card">
                    <h4>{{ serie.name }}</h4>
                    <h5>{{ serie.original_name }}</h5>
                    <p>{{ serie.original_language }}</p>
                    <p>{{ serie.vote_average }}</p>
                </div> -->
                <div v-for="serie in this.store.series" class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <img :src="`${this.store.imgApiUrl}${serie.backdrop_path}`" alt="Paris">
                        </div>
                        <div class="flip-box-back">
                            <h4>Titolo: {{ serie.name }}</h4>
                            <h5>titolo originale: {{ serie.original_name }}</h5>
                            <p>Lingua: {{ serie.original_language }}</p>
                            <p>Voto: {{ serie.vote_average }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
.my_card{
    text-align: center;
    width: calc(20% - 2rem);
    margin: 1rem;
    background-color: red;
}
.flip-box {
  background-color:transparent;
  margin: calc(1rem - -3px );
  width: 342px;
  height: 193px;
  perspective: 1000px; 
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}

.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; 
  backface-visibility: hidden;
}

.flip-box-front {
  color: black;

}

.flip-box-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>
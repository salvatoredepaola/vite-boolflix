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
        getiniziali(autore){
            return autore[0] + autore.split(" ")[1][0];
        }
    },
    mounted() {

    }
}
</script>

<template>
    <main>
        <div class="container-fluid mt-5">
            <input @keyup.enter="avviaRicercaFilms(), avviaRicercaSeries()" type="text" v-model="store.searchText">
            <button @click="avviaRicercaFilms(), avviaRicercaSeries()">DEBUG</button>
            <h2 class="text-light">FILM</h2>
            <div class="row">
                <div class="col d-flex flex-wrap">
                    <!-- <div v-for="film in this.store.movies" class="my_card">
                        <p>{{ film.title }}</p>
                        <p>{{ film.original_title }}</p>
                        <p>{{ film.original_language }}</p>
                        <p>{{ film.vote_average }}</p>
                    </div> -->
                    <div v-for="movie in this.store.movies" class="flip-box">
                        <div class="flip-box-inner">
                            <div class="flip-box-front">
                                <img v-if="movie.backdrop_path" :src="`${this.store.imgApiUrl}${movie.backdrop_path}`" alt="Paris">
                                <div v-else >
                                    <p></p>
                                </div>
                            </div>
                            <div class="flip-box-back">
                                <p>Titolo: <small>{{ movie.title }}</small></p>
                                <p>Titolo originale: <small>{{ movie.original_title }}</small></p>
                                <p>Lingua: <small>{{ movie.original_language }}</small></p>
                                <p>Voto: <small>{{ movie.vote_average }}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 class="text-light">SERIE</h2>
            <div class="row">
                <div class="col d-flex flex-wrap">
                    <!-- <div v-for="serie in this.store.series" class="my_card">
                        <p>{{ serie.name }}</p>
                        <p>{{ serie.original_name }}</p>
                        <p>{{ serie.original_language }}</p>
                        <p>{{ serie.vote_average }}</p>
                    </div> -->
                    <div v-for="serie in this.store.series" class="flip-box">
                        <div class="flip-box-inner">
                            <div class="flip-box-front">
                                <img v-if="serie.backdrop_path" :src="`${this.store.imgApiUrl}${serie.backdrop_path}`" alt="Paris">
                                <div v-else>

                                </div>
                            </div>
                            <div class="flip-box-back">
                                <p>Titolo: <small>{{ serie.name }} </small></p>
                                <p>Titolo originale: <small>{{ serie.original_name }} </small></p>
                                <p>Lingua: <small>{{ serie.original_language }} </small></p>
                                <p>Voto: <small>{{ serie.vote_average }} </small></p>
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

p {
    margin: 0;
    font-weight: 600;
}
small{
    font-weight: 300;
}

.flip-box {
    background-color: transparent;
    margin: calc(1rem);
    width: 342px;
    height: 193px;
    perspective: 1000px;
}

.flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-box:hover .flip-box-inner {
    transform: rotateY(180deg);
}

.flip-box-front,
.flip-box-back {
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
    border: 1px solid white;
    background-color: black;
    color: white;
    transform: rotateY(180deg);
}
</style>
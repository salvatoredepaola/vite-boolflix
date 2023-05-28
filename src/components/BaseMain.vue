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
            console.log("ricerca: ", this.store.searchText)

            const tvSearchEndPoint = `${this.store.apiUrl}tv?api_key=${this.store.apiKey}&query=${this.store.searchText}`;

            axios.get(tvSearchEndPoint).then(result => {
                console.log("serie: ", result.data.results);
                this.store.series = result.data.results
            })

        }
    },
    mounted() {

    }
}
</script>

<template>

<main>
    <div class="container mt-5">
        <input @keyup.enter="avviaRicercaFilms(),avviaRicercaSeries()" type="text" v-model="store.searchText">
        <button @click="avviaRicercaFilms(),avviaRicercaSeries()">DEBUG</button>
        <h2 class="text-light">FILM</h2>
        <div class="row">
            <div class="col d-flex flex-wrap">
                <div v-for="film in this.store.movies" class="my_card">
                    <h4>{{ film.title }}</h4>
                    <h5>{{ film.original_title }}</h5>
                    <p>{{ film.original_language }}</p>
                    <p>{{ film.vote_average }}</p>
                </div>
            </div>
        </div>
        <h2 class="text-light">SERIE</h2>
        <div class="row">
            <div class="col d-flex flex-wrap">
                <div v-for="serie in this.store.series" class="my_card">
                    <h4>{{ serie.name }}</h4>
                    <h5>{{ serie.original_name }}</h5>
                    <p>{{ serie.original_language }}</p>
                    <p>{{ serie.vote_average }}</p>
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
</style>
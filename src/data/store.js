import { reactive } from "vue";

export const store = reactive({
    searchText: "",
    movies: [],
    series: [],
    apiUrl: "https://api.themoviedb.org/3/search/",
    apiKey: '6b3ae4175c08f5f0bb6744a365477b94',
});
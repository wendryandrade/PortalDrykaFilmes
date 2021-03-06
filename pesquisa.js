import { apiGet } from "./api.js";

let actualPage = 1;

$(document).ready(async() => {
    addFormEventListener();
});

function addFormEventListener() {
    $("#form-search").submit(async(event) => {
        event.preventDefault();

        const value = $("#input-search").val();
        const result = await searchMovie(value);

        clearLastSearch();
        makeResultCards(result);
    });
}

//Pesquisar filme
async function searchMovie(query, page) {
    try{
        const response = await apiGet(`/search/movie?language=pt-BR&query=${query}${page ? "&page=" + page : ""}`);
        return response;
    } catch(error) {
        return null;
    }
}

//Detalhes filme
async function getMovieDetails(movieId) {
    try{
        const movie = await apiGet(`/movie/${movieId}?region=BR&language=pt-BR`);

        return movie;
    } catch(err) {
        return null;
    }
}

//Limpar última busca
function clearLastSearch() {
   $(".result-ctn").empty();
}

function makeResultCards(queryResult) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const cardsContainer = $(".result-ctn");

    if(!queryResult.errors && queryResult.results && queryResult.results.length > 0){
        actualPage = queryResult.page;

        queryResult.results.forEach(async(movie) => {
            const movieDetails = await getMovieDetails(movie.id);

            const movieCard = `
            <div class="card col-3 p-2 mb-3" style="width: 18rem;">
                <img src="${movie.poster_path ? imageBaseUrl + movie.poster_path : 'assets/images/no-image.jpg'}" class="card-img-top" alt="${movie.title}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="mb-2"> 
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                    </div>
                    <a href="https://www.imdb.com/title/${movieDetails.imdb_id}" class="btn btndetalhes btn-primary" target="_blank">Ver detalhes</a>
                </div>
            </div>
            `;
    
            cardsContainer.append(movieCard);
        });
    } else {
        const searchNotFound = `
            <div class="w-100 d-flex justify-content-center align-items-center pt-5 pb-5">
                <h3>Resultado não encontrado.</h3>
            </div>
        `;

        cardsContainer.append(searchNotFound);
    }
}









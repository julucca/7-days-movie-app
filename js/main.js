import { api } from './api.js'
import { LocalStorage } from './localStorage.js'

const $moviesList = document.querySelector('[data-list]');
const $form = document.querySelector('[data-form]');
const $searchInput = document.querySelector('[data-search]');
const $checkboxInput = document.querySelector('[data-checkbox]');

// [General Functions]
function updateMovieList(movies) {
    movies.forEach(movie => renderMovie(movie));
}

function cleanMovieList() {
    $moviesList.innerHTML = '';
};

// [Search Functionality]
$form.addEventListener('submit', function(event) {
    event.preventDefault();
    searchMovie();
    $searchInput.value = '';
})

async function searchMovie() {    
    const inputValue = $searchInput.value;

    if(inputValue != '') {
        cleanMovieList();
        const movies = await api.searchMovieByName(inputValue);
        updateMovieList(movies);
    }
};

// [Favorite Functionality]
function favoriteBtnPressed(event, movie) {
    const favoriteState = {
        favorited: 'assets/img/icon-favorite-full.svg',
        notFavorited: 'assets/img/icon-favorite.svg'
    }

    if(event.target.src.includes(favoriteState.notFavorited)) {
        event.target.src = favoriteState.favorited
        LocalStorage.addMovieToFavorites(movie)
    } else {
        event.target.src = favoriteState.notFavorited
        LocalStorage.removeMovieFromFavorites(movie.id)
    }
}

// [Filter Favorites Movies]
$checkboxInput.addEventListener('change', filterFavoriteMovies);

function filterFavoriteMovies() { 
    cleanMovieList();
    if($checkboxInput.checked) {
        getAllFavoritesMovies();
    } else {
        getAllPopularMovies();
    }
};

function getAllFavoritesMovies() {
    const movies = LocalStorage.getFavoriteMovies();
    updateMovieList(movies);
};

async function getAllPopularMovies() {
    const movies = await api.getPopularMovies();
    updateMovieList(movies);
}

// [Render Movies]
window.addEventListener('load', getAllPopularMovies);

function renderMovie(movie) {
    
    const { id, title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = LocalStorage.checkMovieIsFavorited(id);
    const description = overview;

    const year = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const movieItem = document.createElement('li');
    movieItem.classList.add('movie__item');
    $moviesList.appendChild(movieItem);

    const movieImageContainer = document.createElement('div');
    movieImageContainer.classList.add('movie__image');
    const movieImage = document.createElement('img');
    movieImage.src = image;
    movieImage.alt = `${title} poster`;
    movieImageContainer.appendChild(movieImage);
    movieItem.appendChild(movieImageContainer);

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie__info');
    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie__title');
    movieTitle.textContent = `${title} (${year})`;
    movieInfo.appendChild(movieTitle);
    movieItem.appendChild(movieInfo);

    const movieActions = document.createElement('div');
    movieActions.classList.add('movie__actions');
    movieInfo.appendChild(movieActions);

    const movieRatingContainer = document.createElement('span');
    movieActions.appendChild(movieRatingContainer); 
    const movieRatingIcon = document.createElement('span');
    movieRatingIcon.classList.add('movie__icon');
    movieRatingIcon.classList.add('movie__icon--rating');
    movieRatingContainer.appendChild(movieRatingIcon);
    const movieRatingText = document.createElement('span');
    movieRatingText.textContent = vote_average;
    movieRatingContainer.appendChild(movieRatingText);

    const movieFavoriteBtn = document.createElement('button');
    movieActions.appendChild(movieFavoriteBtn);
    const movieFavoriteIcon = document.createElement('img');
    movieFavoriteIcon.classList.add('movie__icon');
    movieFavoriteIcon.classList.add('movie__icon--favorite');
    movieFavoriteIcon.src = isFavorited ? './assets/img/icon-favorite-full.svg' : './assets/img/icon-favorite.svg';
    movieFavoriteIcon.addEventListener('click', (event) => favoriteBtnPressed(event, movie));
    movieFavoriteBtn.appendChild(movieFavoriteIcon);
    const movieFavoriteText = document.createElement('span');
    movieFavoriteText.textContent = 'Favoritar';
    movieFavoriteBtn.appendChild(movieFavoriteText);

    const movieDescription = document.createElement('p');
    movieDescription.classList.add('movie__description');
    movieDescription.textContent = description == '' ? 'Sinopse não está disponível.' : description;
    movieItem.appendChild(movieDescription);
}
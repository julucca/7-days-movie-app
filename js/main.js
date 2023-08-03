import { apiKey } from '../environment/key.js'

const $moviesList = document.querySelector('[data-list]');
const $searchInput = document.querySelector('[data-search]');
const $searchBtn = document.querySelector('[data-searchBtn]')

// [Search Functionality]
$searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    searchMovie();
});

$searchInput.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        searchMovie()
        return
    }
});

async function searchMovie() {    
    const inputValue = $searchInput.value;

    if(inputValue != '') {
        cleanAllMovies();
        const movies = await searchMovieByName(inputValue);
        movies.forEach(movie => renderMovie(movie));
    }
};

function cleanAllMovies() {
    $moviesList.innerHTML = '';
};

async function searchMovieByName(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1`;
    const fetchResponse = await fetch(url);
    const { results } = await fetchResponse.json();
    return results
};

// [API Request]
async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const fetchResponse = await fetch(url);
    const { results } = await fetchResponse.json();
    return results;
}

// [Favorite Functionality]
function favoriteBtnPressed(event, movie) {
    const favoriteState = {
        favorited: 'assets/img/icon-favorite-full.svg',
        notFavorited: 'assets/img/icon-favorite.svg'
    }

    if(event.target.src.includes(favoriteState.notFavorited)) {
        event.target.src = favoriteState.favorited
        addMovieToFavorites(movie)
    } else {
        event.target.src = favoriteState.notFavorited
        removeMovieFromFavorites(movie.id)
    }
}

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

function addMovieToFavorites(movie) {
    const movies = getFavoriteMovies()
    movies.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(movies))
}

function checkMovieIsFavorited(id) {
    const movies = getFavoriteMovies()
    return movies.find(movie => movie.id == id)
}

function removeMovieFromFavorites(id) {
    const movies = getFavoriteMovies()
    const findMovie = movies.find(movie => movie.id == id)
    const newMovies = movies.filter(movie => movie.id != findMovie.id)
    localStorage.setItem('favoriteMovies', JSON.stringify(newMovies))
}

// [Render Movies]
window.onload = async function() {
    const movies = await getPopularMovies();
    movies.forEach(movie => renderMovie(movie));
}

function renderMovie(movie) {
    
    const { id, title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = checkMovieIsFavorited(id);

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
    movieDescription.textContent = overview;
    movieItem.appendChild(movieDescription);
}
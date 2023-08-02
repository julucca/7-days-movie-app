import { apiKey } from '../environment/key.js'

const moviesList = document.querySelector('[data-list]');

// [API Request]
async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const fetchResponse = await fetch(url);
    const { results } = await fetchResponse.json();
    return results;
}

// [Render Movies]
window.onload = async function() {
    const movies = await getPopularMovies();
    movies.forEach(movie => renderMovie(movie));
}

function renderMovie(movie) {
    
    const { title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = false;

    const year = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const movieItem = document.createElement('li');
    movieItem.classList.add('movie__item');
    moviesList.appendChild(movieItem);

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
    movieFavoriteBtn.appendChild(movieFavoriteIcon);
    const movieFavoriteText = document.createElement('span');
    movieFavoriteText.textContent = 'Favoritar';
    movieFavoriteBtn.appendChild(movieFavoriteText);

    const movieDescription = document.createElement('p');
    movieDescription.classList.add('movie__description');
    movieDescription.textContent = overview;
    movieItem.appendChild(movieDescription);
}
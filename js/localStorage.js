const localStorageList = 'favoriteMovies';

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem(localStorageList)) || [];
}

function addMovieToFavorites(movie) {
    const movies = getFavoriteMovies()
    movies.push(movie);
    localStorage.setItem(localStorageList, JSON.stringify(movies))
}

function checkMovieIsFavorited(id) {
    const movies = getFavoriteMovies()
    return movies.find(movie => movie.id == id)
}

function removeMovieFromFavorites(id) {
    const movies = getFavoriteMovies()
    const findMovie = movies.find(movie => movie.id == id)
    const newMovies = movies.filter(movie => movie.id != findMovie.id)
    localStorage.setItem(localStorageList, JSON.stringify(newMovies))
}

export const LocalStorage = {
    getFavoriteMovies,
    addMovieToFavorites,
    checkMovieIsFavorited,
    removeMovieFromFavorites
}
const moviesList = document.querySelector('[data-list]');

const movies = [
    {
        image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
        title: 'Batman',
        rating: 9.2,
        year: 2022,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: true,
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
        title: 'Avengers',
        rating: 9.5,
        year: 2019,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: false
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
        title: 'Doctor Strange',
        rating: 9.1,
        year: 2022,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: false
    }
]

// [Render Movies]
window.onload = function() {
    movies.forEach(movie => renderMovie(movie));
}

function renderMovie(movie) {
    
    const { title, image, rating, year, description, isFavorited} = movie;

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
    movieRatingText.textContent = rating;
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
    movieDescription.textContent = description;
    movieItem.appendChild(movieDescription);
}
const client_id = '754b5db54dc6143069b81d567d6774e8abe1c66636eb4665459e75d477f944b0';
const movieContainer = document.querySelector('.container')

function renderMovieDetails(movie) {
    return `
    <div class="movie-details">
    <img class="movie-img" alt="Movie Poster" src="https://simkl.in/posters/${movie.poster}_m.webp">
    <div class="movie-info">
      <h1>${movie.title}</h1>
      <p><strong>Year:</strong> ${movie.year}</p>
      <p><strong>ratings:</strong> ${movie.ratings.simkl.rating}</p>
      <p><strong>genres:</strong> ${movie.genres.map(genre => genre)}</p>
      <p>
        <strong>Description:</strong> ${movie.overview}.
      </p>
    </div>
  </div>
    `
}

const getMovieDetails = (movie_id) => {
    return fetch(`https://api.simkl.com/movies/${movie_id}?extended=full&client_id=${client_id}`)
        .then(res => res.json())
        .then(res => movieContainer.innerHTML = renderMovieDetails(res))
}

const checkUrl = () => {
    const [hash, movieId] = location.search.split('=')
    getMovieDetails(movieId)
}

checkUrl()
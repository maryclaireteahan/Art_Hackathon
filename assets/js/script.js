const DOM_Elements = {
    movies: document.querySelector('.movies-container'),
    searchBar: document.getElementById("searchBar"),
    button: document.querySelector(".btn")
}

DOM_Elements.button.addEventListener('click', search)

function getMovieHTML(title, img_url, id) {
    return `
    <div id=${id}>
        <a href="/Art_Hackathon/details.html?id=${id}">
            <img class="movie-img" src="https://simkl.in/posters/${img_url}_m.webp">
            <p>${title}</p>
        </a>
    </div>
    `
}

const client_id = '754b5db54dc6143069b81d567d6774e8abe1c66636eb4665459e75d477f944b0';
const getPopularMovies = () => {
    return fetch(`https://api.simkl.com/movies/trending/?extended=overview,theater,metadata,tmdb,genres&client_id=${client_id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res[0].title, res[0].poster, res[0].ids.simkl_id)
            renderMovies(res)
        })
}

function renderMovies(movies) {
    DOM_Elements.movies.innerHTML = movies.map(movie => getMovieHTML(movie.title, movie.poster, movie.ids.simkl_id))
}

const getSearchedMovies = (search) => {
    return fetch(`https://api.simkl.com/search/movie?q=${search}&limit=100&client_id=${client_id}`)
        .then(res => res.json())
        .then(res => {      
            renderMovies(res)
        })
}

function search() {
    let text = DOM_Elements.searchBar.value
    if(text.length < 1) {
        getPopularMovies()
    } else {
        getSearchedMovies(text)
    }   
}

getPopularMovies()




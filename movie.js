const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2E3YTY5MWMyMDI3YzM5ZjJjYjg2ZDQ2OWVlY2NjNSIsIm5iZiI6MTcxOTA1NjIyNy43MjE2MTUsInN1YiI6IjY2NzVmODA0YWM5ZjZjMzExNTg3OTNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gmLvr5yAaH2F9NaaACurJYKDJpBiSLaBDFUfd--MZBw'
    }
};


let movieIds = [];
const fetchData = async () => {
    try {
        const res = await fetch(apiUrl, options);
        if (!res.ok) {
            throw new Error("Error fetching movies");
        }
        const data = await res.json();
        const results = data.results;
        movieIds = results.map(movie => movie.id);  // Store all movie IDs
        console.log('Movie IDs:', movieIds);
        console.log(results);
        displaymovies(results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData()
const displaymovies = (movies) => {
    const movieContainer = document.getElementById("grid-container");
    movieContainer.innerHTML = "";

    movies.slice(0, 100).forEach((movie, index) => {
        const content = document.createElement("div");
        const images = document.createElement("img")
        content.classList.add("movie-content");
        content.innerHTML = `
        <a href=${`tralier.html?movieid=${movie.id}`}>
      <img src=${`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=${movie.original_title}>
      <h1>${movie.original_title}</h1>
      <p>Rating: ${movie.vote_average}%</p>

    `;
        // content.appendChild(images)
        movieContainer.appendChild(content);

    });
};
fetchData();



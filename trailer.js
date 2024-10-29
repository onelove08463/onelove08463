const params = new URLSearchParams(window.location.search);
const newId = params.get("movieid");
window.onload = ()=>{
    if (!newId) {
        window.location.href ="index.html";
        
    }
}
const id = newId;
const apiKey = "11ca62a738dc81495dca5a3cef42e8f5";
const baseUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

async function getMovieDetails() {
    try {
        const response = await fetch(movieDetailsUrl);
        if (!response.ok) {
            throw new Error("Error fetching details");
        }
        const details = await response.json();
        return details; // Return the details object directly
    } catch (error) {
        console.error("Error fetching details", error);
        throw error; // Re-throw the error to propagate it
    }
}

async function fetchVideo() {

    const rel_date = document.querySelector(".rel-date");
    const runtime = document.querySelector(".runtime")
    const votes = document.querySelector(".votes");
    const name = document.querySelector(".movieName")
    const overview = document.querySelector(".desc")
    const genre0 = document.querySelector(".science-fiction")
    const genre1 = document.querySelector(".action")
    const star = document.querySelector(".star-vote")
    const origin = document.querySelector(".Origin")
    const production = document.querySelector(".Production")
    const language = document.querySelector(".lang")
    try {
        // Fetch movie details first
        const movieDetails = await getMovieDetails();
        console.log(movieDetails);

        // Then fetch videos
        const response = await fetch(baseUrl);
        if (!response.ok) {
            ;
            throw new Error("Error fetching movies");
        }
        const data = await response.json();
        const results = data.results;
        const filteredVideos = results.filter(
            (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
        );
        if (filteredVideos.length === 0) {
            throw new Error("No YouTube trailers found");
        }

        const randomTrailer =
            filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
        let trailerUrl;
        if (randomTrailer.site === "YouTube") {
            trailerUrl = `https://www.youtube.com/embed/${randomTrailer.key}?si=ebdoBZ2qB8a13ZGr`;
        } else {
            trailerUrl = `https://vimeo.com/${randomTrailer.key}`;
        }

        // Assuming there's an HTML element with tag 'iframe' where you want to display the video
        let video = document.querySelector("iframe");
        video.src = trailerUrl;




        // const releaseDate = new Date(movieDetails.release_date);
        // const formattedDate = releaseDate.toLocaleString('en-US', {
        //     weekday: 'short',
        //     day: '2-digit',
        //     month: 'short',
        //     year: 'numeric'
        // });

        rel_date.innerHTML = `Release Date: ${movieDetails.release_date}`;
        runtime.innerHTML = `Run time: ${movieDetails.runtime}m`
        votes.innerHTML = `<b> ${movieDetails.vote_count} votes </b>`;
        star.innerHTML = `${movieDetails.vote_average}% Rating  `;
        name.innerHTML = `${movieDetails.title}`;
        overview.innerHTML = `${movieDetails.overview}`
        genre0.innerHTML = `${movieDetails.genres[0].name}`
        genre1.innerHTML = `${movieDetails.genres[1].name}`
        origin.innerHTML = `<b class = "col">ORIGINAL COUNTRY:</b> ${movieDetails.origin_country}`
        production.innerHTML = `<b class = "col">PRODUCTION COUNTRY:</b> ${movieDetails.production_countries[0].name}`
        language.innerHTML = `<b class = "col"> LANGUAGE:</b> ${movieDetails.original_language}`
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchVideo();
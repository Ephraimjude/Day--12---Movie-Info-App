// index.js

const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

async function searchMovie() {
    // Add the 'searching' class to trigger the animation
    searchBtn.classList.add("searching");

    // Function to fetch data from API
    const movieName = movieNameRef.value.trim();

    // If input field is empty
    if (!movieName) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
        searchBtn.classList.remove("searching");
        return;
    }

    const apiKey = "a34e5****";
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // If movie exists in the database
        if (data.Response === "True") {
            result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
            `;
        } else {
            result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
    } catch (error) {
        console.error(error);
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
    } finally {
        // Remove the 'searching' class after the search is complete
        searchBtn.classList.remove("searching");
    }
}

searchBtn.addEventListener("click", searchMovie);

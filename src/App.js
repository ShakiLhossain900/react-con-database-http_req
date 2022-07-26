// fetch from starway api and   therefore and backend app  which return to database

import React, {useState} from "react";
import "./App.css";
import MoviesList from "./components/MoviesList";
function App() {

  const [movies, setMovies] = useState([])

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: "Some Dummy Movie",
  //     openingText: "This is the opening text of the movie",
  //     releaseDate: "2021-05-18",
  //   },
  //   {
  //     id: 2,
  //     title: "Some Dummy Movie 2",
  //     openingText: "This is the second opening text of the movie",
  //     releaseDate: "2021-05-19",
  //   },
  // ];

function fetchMoviehandler() { 
  fetch('https://swapi.dev/api/films/')
  .then((response) => {
    return response.json();
    })
  .then((data) => {
    const transformedMovie = data.results.map(movieData => { 
      return { 
        id: movieData.episode_id,
        title : movieData.title, 
        openingText : movieData.opening_crawl, 
        releaseDate : movieData.release_date,
      }
    })
    setMovies(transformedMovie);
  });
}


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;

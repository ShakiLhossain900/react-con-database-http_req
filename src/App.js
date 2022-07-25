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
    setMovies(data.results);
  });
}


  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;

// // fetch from starway api and   therefore and backend app  which return to database

// import React, {useState} from "react";
// import "./App.css";
// import MoviesList from "./components/MoviesList";
// function App() {

//   const [movies, setMovies] = useState([])

//   // const dummyMovies = [
//   //   {
//   //     id: 1,
//   //     title: "Some Dummy Movie",
//   //     openingText: "This is the opening text of the movie",
//   //     releaseDate: "2021-05-18",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Some Dummy Movie 2",
//   //     openingText: "This is the second opening text of the movie",
//   //     releaseDate: "2021-05-19",
//   //   },
//   // ];

// function fetchMoviehandler() {
//   fetch('https://swapi.dev/api/films/')
//   .then((response) => {
//     return response.json();
//     })
//   .then((data) => {
//     const transformedMovie = data.results.map(movieData => {
//       return {
//         id: movieData.episode_id,
//         title : movieData.title,
//         openingText : movieData.opening_crawl,
//         releaseDate : movieData.release_date,
//       }
//     })
//     setMovies(transformedMovie);
//   });
// }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviehandler}>Fetch Movies</button>
//       </section>
//       <section>
//         <MoviesList movies={movies} />
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

// import React, { useState } from "react";

// import MoviesList from "./components/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsloading] = useState(false);
//   const [error, setError] = useState(null);

//   async function fetchMoviesHandler() {
//     setIsloading(true);
//     setError(null);

//     try {
//       const response = await fetch("https://swapi.dev/api/films/");
//       if (!response.ok) {
//         throw new Error("Something went wrong");
//       }
//       const data = await response.json();

//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMovies(transformedMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsloading(false);
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
//         {isLoading && <p>Loading...</p>}
//         {!isLoading && error && <p>{error}</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

// using useEffect for request

import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-con-database-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-con-database-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}
export default App;

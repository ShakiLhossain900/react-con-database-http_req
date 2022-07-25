import React from "react";
import Movie from "./Movie";
import classes from "./MoviesList.module.css";
const MoviesList = (props) => {
  return (
    <ul className={classes["Movies-List"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.release}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MoviesList;

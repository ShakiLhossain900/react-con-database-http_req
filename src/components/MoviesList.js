import React from 'react';
import Movie from './Movie'
const MoviesList = (props) => {

    return (
        <ul>
           {props.movies.map((movie) =>(
            <Movie
            key ={movie.id}
            title ={movie.title}
            releaseDate ={movie.release}
            openingText ={movie.openingText}
            />
           ))} 
        </ul>
    );
};

export default MoviesList;
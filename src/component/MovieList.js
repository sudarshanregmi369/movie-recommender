import React from 'react'
const MovieList = (props)=> {
    const FavauriteComponent= props.favouriteComponent;
    
    return (
        <>
        {props.movies.map((movie,index)=>(
        <div className='image-container d-flex justify-content-start m-3'>
            <img src={movie.Poster} alt ='movie' key={index}></img>
            <div onClick={() => props.handleFavoriteClick(movie)}  className='overlay d-flex align-items-center justify'>
               <FavauriteComponent/>
            </div>
        </div>

        ))}
        </>
    );
};
export default MovieList;



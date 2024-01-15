import React, { useEffect, useState } from  'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './component/SearchBox';
import MovieList from './component/MovieList';
import MovieListHeading from './component/MovieListHeading';
import AddFavourites from './component/AddFavourites';
import RemoveFavourite from './component/RemoveFavourite';

const App=()=>{
  const [movies, setMovies]=useState([]);
  const[favourites, setFavourites]= useState([]);
  const [searchValue,setSearchValue] = useState('');
  const getMovieRequest = async(searchValue)=>{
  const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=4a0ed36e`;
  const response = await fetch(url);
  const responseJson = await response.json();
  
  if(responseJson.Search){
  setMovies(responseJson.Search);
}
}
useEffect(()=>{
  getMovieRequest(searchValue);

},[searchValue]);
useEffect(()=>{
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourites')
    );
    setFavourites(movieFavourites);
}
)

const saveToLocalStorage=(items)=>{
  localStorage.setItem('react-app-favorite-movie',JSON.stringify(items));


}



const addFavouriteMovie=(movie)=>{
  const newFavouriteList  = [...favourites,movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
}

const RemoveFavouriteMovie=(movie)=>{
const newFavouriteList = favourites.filter(
  (favourite)=>favourite.imdbID!=movie.imdbID
  );
setFavourites(newFavouriteList);
}
  return( 
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'> 
    <div className='row'> 
      <MovieListHeading heading ='Movie'/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
  <MovieList movies={movies} handleFavoriteClick ={addFavouriteMovie} favauriteComponent ={AddFavourites}/>
  </div>
  <div className='row d-flex align-items-center mt-4 mb-4'> 
  <MovieListHeading heading ='Favourites'/> </div>
  <div className='row'>
  <MovieList movies={favourites} handleFavoriteClick ={addFavouriteMovie} favauriteComponent ={RemoveFavourite}/>

  </div>
  </div>
  );
};
export default App;

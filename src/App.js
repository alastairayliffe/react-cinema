import React from 'react';
import Button from './Button';
import FilmOverview from "./FilmOverview";

const omdbKey = 'd09805b1';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      searchTerm:"",
      searchArray:[]};
    this.onValueChange = this.onValueChange.bind(this);
    this.searchForFilms = this.searchForFilms.bind(this);
    this.searchIndividualFilm = this.searchIndividualFilm.bind(this);

  }


  onValueChange(event){
    this.setState({searchTerm: event.target.value})
  }

  searchForFilms(event){
    let searchingFor = this.state.searchTerm;
    let url = `http://www.omdbapi.com/?s=${searchingFor}&apikey=${omdbKey}`;
    let filmCollectionPromise = this.filmApi(url);
    filmCollectionPromise.then(filmArray => {
      this.setState({searchArray : filmArray});
    })
  }

  searchIndividualFilm(imdbID){
    let url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${omdbKey}`;
    let filmIndividualPromise = this.filmApi(url);
    filmIndividualPromise.then(film => {
      this.setState({individualFilm: film});
      console.log(film);
    })
  }

  filmApi(url){
    return fetch(url)
      .then(response => response.json())
      .then(function(films){
        let filmArray = films.Search;
        return filmArray;
        })
    }


  render(){

    let movieList = this.state.searchArray.map(function(movie){
        return <FilmOverview
          title={movie.Title}
          poster={movie.Poster}
          year={movie.Year}
          type={movie.Type}
          imdbID={movie.imdbID}
          key={movie.imdbID}
          fetchDetailsFunction = {this.searchIndividualFilm}
        />
    });


    return (
      <div>
        <form>
        <input type="text" name="searchValue" onChange={this.onValueChange} />
        <button type="button" name="submit" onClick={this.searchForFilms} />
        </form>
        {movieList}
      </div>
    )
  }
}

export default App;

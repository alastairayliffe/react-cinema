import React from 'react';
import Button from './Button';

const omdbKey = 'd09805b1';

class App extends React.Component {
  constructor(){
    super();

    this.state = {searchTerm:""};
    this.onValueChange = this.onValueChange.bind(this);
    this.searchForFilms = this.searchForFilms.bind(this);

  }

  onValueChange(event){
    this.setState({searchTerm: event.target.value})
  }

  searchForFilms(event){
    let searchingFor = this.state.searchTerm;
    console.log(omdbKey);
    let url = `http://www.omdbapi.com/?s=${searchingFor}&apikey=${omdbKey}`;
    let filmCollectionPromise = this.filmApi(url);
    console.log(filmCollectionPromise);
    Promise.all([filmCollectionPromise]).then(function(values){
      console.log(values);
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
    return (
      <div>
        <form>
        <input type="text" name="searchValue" onChange={this.onValueChange} />
        <button type="button" name="submit" onClick={this.searchForFilms} />
        </form>
      </div>
    )
  }
}

export default App;

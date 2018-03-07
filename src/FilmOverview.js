import React from "react";

class FilmOverview extends React.Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

handleClick(event){
  console.log(this.props.imdbID);
  this.props.fetchDetailsFunction(this.props.imdbID);

}


  render(){
    const {poster, title, type, year, imdbID, fetchDetailsFunction} = this.props;
    return (
      <div key={imdbID} id={imdbID}>
        <img src={poster} />
        {title}
        {year}
        <button type="button" name="click" onClick={this.handleClick}>More details</button>
      </div>
    )
  }
}

export default FilmOverview;

import React, { Component } from 'react'

const genreList = ['Rock','Alternative','Pop','Punk','Indie','Jazz','Classical','Others']
export class GenreOptions extends Component {
    render() {
        var divStyle = {
            margin: 32,
        }
        return (
            <div style={divStyle}>
                {genreList.map((genre) => <button type="button" className="btn btn-outline-dark  btn-icon-text">
                    {genre}
                </button>)}
            </div>
        )
    }
}

export default GenreOptions;

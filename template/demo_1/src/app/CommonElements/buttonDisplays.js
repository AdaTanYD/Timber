import React, { Component } from 'react'

export class ButtonDisplays extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var divStyle = {
            margin: 32,
        }
        return (
            <div style={divStyle}>
                {this.props.displayList ? this.props.displayList.map((option) =>
                    <button key={option} value={option} 
                     type="button" className="btn btn-outline-dark  btn-icon-text">
                        {option}
                    </button>) : null}
            </div>
        )
    }
}

export default ButtonDisplays;

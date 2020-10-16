import React, { Component } from 'react'

export class ButtonOptions extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        var divStyle = {
            margin: 32,
        }
        return (
            <div style={divStyle}>
                {this.props.optionsList.map((option) => <button type="button" className="btn btn-outline-dark  btn-icon-text">
                    {option}
                </button>)}
            </div>
        )
    }
}

export default ButtonOptions;

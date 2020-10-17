import React, { Component } from 'react'

const selectedStyle = {opacity: 1 , margin: 3}
const disabledStyle = {opacity: 0.5, margin: 3} 

export class ButtonOptions extends Component {
    constructor(props) {
        super(props);
      }

    onClick = event => {
        if (this.props.selectedList.includes(event.target.value)){
            this.props.onChange(this.props.selectedList.filter((selectedOption) => selectedOption !== event.target.value))
        }
        else {
        this.props.onChange([... this.props.selectedList, event.target.value])
    }
      };

    render() {
        var divStyle = {
            margin: 32,
        }
        return (
            <div style={divStyle}>
                {this.props.optionsList.map((option) => 
                <button key={option.option} value={option.option} style={this.props.selectedList ? this.props.selectedList.includes(option.option) ? selectedStyle: disabledStyle : disabledStyle} type="button" class="btn btn-outline-dark  btn-icon-text" onClick={this.onClick}>
                    {option.icon ? <i className={option.icon}></i> : null}
                    {option.option}
                </button>)}
            </div>
        )
    }
}

export default ButtonOptions;

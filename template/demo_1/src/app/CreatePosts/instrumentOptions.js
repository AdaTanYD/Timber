import React, { Component } from 'react'


export class InstrumentOptions extends Component {
    render() {
        var divStyle = {
            margin: 32,
        }
        return (
            <div style={divStyle}>
                                    <button className="btn btn-outline-dark btn-icon-text">
                                        <i className="mdi mdi-guitar-electric btn-icon-prepend mdi-24px"></i>
                                        <span className="d-inline-block text-left">
                                            Electric Guitar
                        </span>
                                    </button>
                                    <button className="btn btn-outline-dark btn-icon-text">
                                        <i className="mdi mdi-guitar-acoustic btn-icon-prepend mdi-24px"></i>
                                        <span className="d-inline-block text-left">
                                            Acoustic Guitar
                        </span>
                                    </button>
                                    <button className="btn btn-outline-dark btn-icon-text">
                                        <i className="mdi mdi-music-circle btn-icon-prepend mdi-24px"></i>
                                        <span className="d-inline-block text-left">
                                            Drums
                        </span>
                                    </button>
                                    <button className="btn btn-outline-dark btn-icon-text">
                                        <i className="mdi mdi-music-circle btn-icon-prepend mdi-24px"></i>
                                        <span className="d-inline-block text-left">
                                            Keys
                        </span>
                                    </button>
                                    <button className="btn btn-outline-dark btn-icon-text">
                                        <i className="mdi mdi-microphone-variant btn-icon-prepend mdi-24px"></i>
                                        <span className="d-inline-block text-left">
                                            Vocals
                        </span>
                                    </button>
                                    <button className="btn btn-outline-dark btn-icon-text">
                                        <i className="mdi mdi-saxophone btn-icon-prepend mdi-24px"></i>
                                        <span className="d-inline-block text-left">
                                            Others
                        </span>
                                    </button>
            </div>
        )
    }
}

export default InstrumentOptions;

import React, { Component } from 'react'
import { Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const instrumentOptions =
    [{ "option": 'Electric Guitar', "icon": "mdi mdi-guitar-electric btn-icon-prepend mdi-24px" },
    { "option": 'Acoustic Guitar', "icon": "mdi mdi-guitar-acoustic btn-icon-prepend mdi-24px" },
    { "option": 'Drums', "icon": "mdi mdi-music-circle btn-icon-prepend mdi-24px" },
    { 'option': 'Keys', "icon": "mdi mdi-music-circle btn-icon-prepend mdi-24px" },
    { "option": 'Vocals', "icon": "mdi mdi-microphone-variant btn-icon-prepend mdi-24px" },
    { "option": 'Others', "icon": "mdi mdi-saxophone btn-icon-prepend mdi-24px" }
    ];

export class InstrumentIcon extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <OverlayTrigger
                    placement={'bottom'}
                    overlay={
                        <Tooltip>
                            {this.props.instrument}
                        </Tooltip>
                    }
                >
                    <Image src={require(`../../../assets/images/music_icons/${this.props.instrument}.png`)} alt="profile" roundedCircle style={{ width: this.props.diameter ? this.props.diameter : 50, height: this.props.diameter ? this.props.diameter : 50 }} />
                </OverlayTrigger>

            </div>
        )
    }
}

export default InstrumentIcon;

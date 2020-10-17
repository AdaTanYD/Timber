import React, { Component, useState } from 'react'
import { FirebaseContext } from '../Firebase';
import { Form } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { withAuthUser } from '../Session';
import { Link } from 'react-router-dom';
import ButtonOptions from '../CommonElements/buttonOptions';

const instrumentOptions =
    [{ "option": 'Electric Guitar', "icon": "mdi mdi-guitar-electric btn-icon-prepend mdi-24px" },
    { "option": 'Acoustic Guitar', "icon": "mdi mdi-guitar-acoustic btn-icon-prepend mdi-24px" },
    { "option": 'Drums', "icon": "mdi mdi-music-circle btn-icon-prepend mdi-24px" },
    { 'option': 'Keys', "icon": "mdi mdi-music-circle btn-icon-prepend mdi-24px" },
    { "option": 'Vocals', "icon": "mdi mdi-microphone-variant btn-icon-prepend mdi-24px" },
    { "option": 'Others', "icon": "mdi mdi-saxophone btn-icon-prepend mdi-24px" }
    ];

const preferredGenreOptions =
    [{ "option": 'Rock' },
    { "option": 'Alternative' },
    { "option": 'Pop' },
    { 'option': 'Punk' },
    { "option": 'Indie' },
    { "option": 'Jazz' },
    { "option": 'Classical' },
    { "option": 'Others' }
    ];

const skillOptions =
    [{ "option": 'Beginner' },
    { "option": 'Amateur' },
    { "option": 'Intermediate' },
    { 'option': 'Good' },
    { "option": 'Expert' }];

const performanceExperienceOptions =
    [{ "option": 'None' },
    { "option": 'A long time ago' },
    { "option": 'Few' },
    { 'option': 'Frequent' },];

const playLengthOptions =
    [{ "option": '< 1 Year' },
    { "option": '1 - 2 Years' },
    { "option": '3 - 5 Years' },
    { 'option': '6 - 10 Years' },
    { 'option': '> 10 Years' },];

const INITIAL_STATE = {
    selectedInstruments: [],
    selectedGenres: [],
};


export class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }

    onSelectInstrument = (selectedInstruments) => {
        this.setState({ selectedInstruments: selectedInstruments });
      };
    
      onSelectGenre = (selectedGenres) => {
        this.setState({ selectedGenres: selectedGenres });
      };

    render() {
        return (
            <div>
                {console.log(this.state)}
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-12 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src={require("../../assets/images/logo.svg")} alt="logo" />
                                </div>
                                <h4>Edit your profile</h4>
                                <Form className="pt-3">
                                    <h5>Basic Information</h5>
                                    <span />
                                    <h6 className="font-weight-light">What instrument(s) do you play?</h6>
                                    <ButtonOptions optionsList={instrumentOptions} onChange={this.onSelectInstrument} selectedList={this.state.selectedInstruments}/>
                                    <h6 className="font-weight-light">Preferred genres</h6>
                                    <ButtonOptions optionsList={preferredGenreOptions} onChange={this.onSelectGenre} selectedList={this.state.selectedGenres}/>
                                    <h6 className="font-weight-light">Biography</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control as="textarea" rows="2" placeholder="Describe yourself!" size="lg" className="h-auto" onChange={this.onChange} name="biography" />
                                    </Form.Group>
                                    <h6 className="font-weight-light">Contact details</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control as="textarea" rows="1" placeholder="Contact" size="lg" className="h-auto" onChange={this.onChange} name="spotify link" />
                                    </Form.Group>
                                    <h5>Skills Level</h5>
                                    <h6 className="font-weight-light">What level would you describe yourself to be?</h6>
                                    <ButtonOptions optionsList={skillOptions} />
                                    <h6 className="font-weight-light">Performance experience</h6>
                                    <ButtonOptions optionsList={performanceExperienceOptions} />
                                    <h6 className="font-weight-light">How long have you been playing?</h6>
                                    <ButtonOptions optionsList={playLengthOptions} />
                                    <span />
                                    <h5>Preferences</h5>
                                    <h6 className="font-weight-light">Top 5 Favourite Artists</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Row>
                                            <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="artist 1" />
                                            <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="artist 2" />
                                            <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="artist 3" />
                                            <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="artist 4" />
                                            <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="artist 5" />
                                        </Form.Row>
                                    </Form.Group>
                                    <h6 className="font-weight-light">Spotifiy playlist</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control as="textarea" rows="1" placeholder="Spotify link" size="lg" className="h-auto" onChange={this.onChange} name="spotify link" />
                                    </Form.Group>
                                    <h6 className="font-weight-light">Youtube link</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control as="textarea" rows="1" placeholder="Youtube link" size="lg" className="h-auto" onChange={this.onChange} name="youtube link" />
                                    </Form.Group>
                                    <div className="mt-3">
                                        <button onClick={this.onSubmit} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SAVE</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withFirebase(withAuthUser(EditUserProfile));

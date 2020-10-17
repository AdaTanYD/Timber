import React, { Component, useState } from 'react'
import { Form } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import ButtonOptions from '../CommonElements/buttonOptions';
import ButtonDisplays from '../CommonElements/buttonDisplays';
import Image from 'react-bootstrap/Image'

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


export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: {},
            username: "",
            ...INITIAL_STATE,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        var userID = null;
        console.log(this.props)
        this.props.firebase.auth.onAuthStateChanged(function (user) {
            if (user) {
                userID = user.uid;
            } else {
                console.log("please sign in")
            }
        });

        this.props.firebase.users().on('value', snapshot => {
            var userUID = this.props.match.params.uid;
            if (snapshot.hasChild(userUID)){
                userID = userUID
            }
            this.setState({
                selectedInstruments: snapshot.child(userID).child("selectedInstruments").val(),
                selectedGenres: snapshot.child(userID).child("selectedGenres").val(),
                username: snapshot.child(userID).child("username").val(),
                loading: false,
            });
        });
    }


    onSubmit = () => {
        var user = this.props.firebase.auth.currentUser.uid
        const { selectedInstruments, selectedGenres } = this.state;
        this.props.firebase
            .user(user)
            .update({
                selectedInstruments,
                selectedGenres,
            });
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
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-12 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src={require("../../assets/images/logo.svg")} alt="logo" />
                                </div>
                                <div className="d-flex align-items-center flex-row" style={{ marginBottom: 24 }}>
                                    <div className="p-2">
                                        <Image src={require("../../assets/images/faces/face1.jpg")} alt="profile" roundedCircle />
                                    </div>
                                    <div className="p-2 l-56">
                                        <h3>
                                            {this.state.username}
                                        </h3>
                                        <h6 className="font-weight-light">
                                            Contact email, phone number blah
                                        </h6>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-weight-light">BIO chunk here</h5>
                                </div>

                                <Form className="pt-3">
                                    <h6 className="font-weight-light">Instrument(s)</h6>
                                    <ButtonDisplays displayList={this.state.selectedInstruments} />
                                    <h6 className="font-weight-light">Preferred genres</h6>
                                    <ButtonDisplays displayList={this.state.selectedGenres} />
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
                                        <button onClick={this.onSubmit} type="button" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SAVE</button>
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

export default withFirebase(UserProfile);

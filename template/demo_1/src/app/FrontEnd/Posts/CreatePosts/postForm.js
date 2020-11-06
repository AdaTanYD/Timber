import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import * as ROUTES from '../../../constants/routes';
import { withFirebase } from '../../../BackEnd/Firebase';
import ButtonOptions from '../../CommonElements/buttonOptions';

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

const gigingOptions =
    [{ "option": 'Not at all' },
    { "option": 'Maybe' },
    { "option": 'Absolutely' },
    ];

const commitmentOptions =
    [{ "option": 'Flexible' },
    { "option": 'Monthly' },
    { "option": 'Weekly' },
    { "option": 'Others' },
    ];

const INITIAL_STATE = {
    selectedInstruments: [],
    selectedGenres: [],
    selectedGig: null,
    selectedCommitment: null,
    description: '',
    title: '',
}
export class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
        };
    }

    onSelectInstrument = (selectedInstruments) => {
        this.setState({ selectedInstruments: selectedInstruments });
    };

    onSelectGenre = (selectedGenres) => {
        this.setState({ selectedGenres: selectedGenres });
    };

    onSelectGig = (selectedGig) => {
        this.setState({ selectedGig: selectedGig });
    };

    onSelectCommitment = (selectedCommitment) => {
        this.setState({ selectedCommitment: selectedCommitment });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = () => {
        var user = this.props.firebase.auth.currentUser.uid
        var {
            selectedInstruments,
            selectedGenres,
            selectedGig,
            selectedCommitment,
            description,
            title,
        } = this.state;
        selectedInstruments = selectedInstruments.filter(function( element ) {
            return element !== undefined;
         });
        this.props.firebase.posts()
            .push({
                owner: user,
                selectedInstruments,
                selectedGenres,
                selectedGig,
                selectedCommitment,
                description,
                title,
            }).then(this.props.history.push(ROUTES.POST_LISTINGS));
    }

    render() {
        return (
            <div>
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-12 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src={require("../../../../assets/images/logo.svg")} alt="logo" />
                                </div>
                                <h4>Looking for new band mates?</h4>
                                <h6 className="font-weight-light">Lets get started!</h6>
                                <Form className="pt-3">
                                    <h6 className="font-weight-light">Post Title</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control as="textarea" rows="1" placeholder="Short title " isValid={false} size="lg" className="h-auto" onChange={this.onChange} name="title" value={this.state.title} />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid city.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <h6 className="font-weight-light">What instrument(s) are you looking for?</h6>
                                    <ButtonOptions optionsList={instrumentOptions} onChange={this.onSelectInstrument} selectedList={this.state.selectedInstruments} multiSelect={true} />
                                    <h6 className="font-weight-light">Genre</h6>
                                    <ButtonOptions optionsList={preferredGenreOptions} onChange={this.onSelectGenre} selectedList={this.state.selectedGenres} multiSelect={false} />
                                    <h6 className="font-weight-light">Looking to gig together?</h6>
                                    <ButtonOptions optionsList={gigingOptions} onChange={this.onSelectGig} selectedList={this.state.selectedGig} multiSelect={false} />
                                    <h6 className="font-weight-light">Expected commitment level</h6>
                                    <ButtonOptions optionsList={commitmentOptions} onChange={this.onSelectCommitment} selectedList={this.state.selectedCommitment} multiSelect={false} />
                                    <h6 className="font-weight-light">General Description</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control as="textarea" rows="3" placeholder="Tell your future bandmates something!" size="lg" className="h-auto" onChange={this.onChange} name="description" value={this.state.description} />
                                    </Form.Group>
                                    <div className="mt-3">
                                        <button type="button" onClick={this.onSubmit} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">CREATE POST</button>
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

export default withFirebase(PostForm);

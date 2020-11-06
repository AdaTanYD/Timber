import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../BackEnd/Firebase';
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
    username: '',
    email: '',
    biography: '',
    phoneNumber: '',
    telegramHandle: '',
    skillsLevel: '',
    performanceExperience: '',
    playingLength: '',
    topFiveArtistOne: '',
    topFiveArtistTwo: '',
    topFiveArtistThree: '',
    topFiveArtistFour: '',
    topFiveArtistFive: '',
    spotifyPlaylist: '',
    youtubeLink: '',
};

function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

export class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: {},
            ...INITIAL_STATE,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        var currentUser = await getCurrentUser(this.props.firebase.auth);
        var currentUserID = currentUser.uid
        this.props.firebase.users().on('value', snapshot => {
            this.setState({
                selectedInstruments: snapshot.child(currentUserID).child("selectedInstruments").val(),
                selectedGenres: snapshot.child(currentUserID).child("selectedGenres").val(),
                username: snapshot.child(currentUserID).child("username").val(),
                email: snapshot.child(currentUserID).child("email").val(),
                biography: snapshot.child(currentUserID).child("biography").val(),
                phoneNumber: snapshot.child(currentUserID).child("phoneNumber").val(),
                telegramHandle:snapshot.child(currentUserID).child("telegramHandle").val(),
                skillsLevel: snapshot.child(currentUserID).child("skillsLevel").val(),
                performanceExperience: snapshot.child(currentUserID).child("performanceExperience").val(),
                playingLength: snapshot.child(currentUserID).child("playingLength").val(),
                topFiveArtistOne: snapshot.child(currentUserID).child("topFiveArtistOne").val(),
                topFiveArtistTwo: snapshot.child(currentUserID).child("topFiveArtistTwo").val(),
                topFiveArtistThree: snapshot.child(currentUserID).child("topFiveArtistThree").val(),
                topFiveArtistFour: snapshot.child(currentUserID).child("topFiveArtistFour").val(),
                topFiveArtistFive: snapshot.child(currentUserID).child("topFiveArtistFive").val(),
                spotifyPlaylist: snapshot.child(currentUserID).child("spotifyPlaylist").val(),
                youtubeLink: snapshot.child(currentUserID).child("youtubeLink").val(),
                loading: false,
            });
        });
    }


    onSubmit = () => {
        var user = this.props.firebase.auth.currentUser.uid
        const { selectedInstruments,
            selectedGenres,
            username,
            email,
            biography,
            phoneNumber,
            telegramHandle,
            skillsLevel,
            performanceExperience,
            playingLength,
            topFiveArtistOne,
            topFiveArtistTwo,
            topFiveArtistThree,
            topFiveArtistFour,
            topFiveArtistFive,
            spotifyPlaylist,
            youtubeLink, } = this.state;
        this.props.firebase
            .user(user)
            .update({
                selectedInstruments,
                selectedGenres,
                username,
                email,
                biography,
                phoneNumber,
                telegramHandle,
                skillsLevel,
                performanceExperience,
                playingLength,
                topFiveArtistOne,
                topFiveArtistTwo,
                topFiveArtistThree,
                topFiveArtistFour,
                topFiveArtistFive,
                spotifyPlaylist,
                youtubeLink,
            }).then(this.props.history.push(ROUTES.USER_PROFILE));
    }

    onSelectInstrument = (selectedInstruments) => {
        this.setState({ selectedInstruments: selectedInstruments });
    };

    onSelectGenre = (selectedGenres) => {
        this.setState({ selectedGenres: selectedGenres });
    };

    onSelectSkillsLevel = (selectedSkillsLevel) => {
        this.setState({ skillsLevel: selectedSkillsLevel });
    };

    onSelectPerformanceExperience = (selectedPerformanceExperience) => {
        this.setState({ performanceExperience: selectedPerformanceExperience });
    };

    onSelectPlayingLength = (selectedPlayingLength) => {
        this.setState({ playingLength: selectedPlayingLength });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div>
                {this.state.loading ?
                    <div>Loading...</div>
                    :
                    <div className="d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-12 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src={require("../../../assets/images/logo.svg")} alt="logo" />
                                    </div>
                                    <h4>Edit your profile</h4>
                                    <Form className="pt-3">
                                        <h5>Basic Information</h5>
                                        <span />
                                        <h6 className="font-weight-light">Username</h6>
                                        <Form.Group className="d-flex search-field">
                                            <Form.Control as="textarea" rows="1" placeholder="Username" size="lg" className="h-auto" onChange={this.onChange} name="username" value={this.state.username} />
                                        </Form.Group>
                                        <h6 className="font-weight-light">Email</h6>
                                        <h6 className="font-weight-light">{this.state.email}</h6>
                                        <h6 className="font-weight-light">Phone number</h6>
                                        <Form.Group className="d-flex search-field">
                                            <Form.Control as="textarea" rows="1" placeholder="Phone Number" size="lg" className="h-auto" onChange={this.onChange} name="phoneNumber" value={this.state.phoneNumber} />
                                        </Form.Group>
                                        <h6 className="font-weight-light">Telegram Handle</h6>
                                        <Form.Group className="d-flex search-field">
                                            <Form.Control as="textarea" rows="1" placeholder="Telegram" size="lg" className="h-auto" onChange={this.onChange} name="telegramHandle" value={this.state.telegramHandle} />
                                        </Form.Group>
                                        <h6 className="font-weight-light">Biography</h6>
                                        <Form.Group className="d-flex search-field">
                                            <Form.Control as="textarea" rows="2" placeholder="Describe yourself!" size="lg" className="h-auto" onChange={this.onChange} name="biography" value={this.state.biography} />
                                        </Form.Group>
                                        <h6 className="font-weight-light">What instrument(s) do you play?</h6>
                                        <ButtonOptions optionsList={instrumentOptions} onChange={this.onSelectInstrument} selectedList={this.state.selectedInstruments} multiSelect={true} />
                                        <h6 className="font-weight-light">Preferred genres</h6>
                                        <ButtonOptions optionsList={preferredGenreOptions} onChange={this.onSelectGenre} selectedList={this.state.selectedGenres} multiSelect={true} />
                                        <h5>Skills Level</h5>
                                        <h6 className="font-weight-light">What level would you describe yourself to be?</h6>
                                        <ButtonOptions optionsList={skillOptions} onChange={this.onSelectSkillsLevel} selectedList={this.state.skillsLevel} multiSelect={false} />
                                        <h6 className="font-weight-light">Performance experience</h6>
                                        <ButtonOptions optionsList={performanceExperienceOptions} onChange={this.onSelectPerformanceExperience} selectedList={this.state.performanceExperience} multiSelect={false} />
                                        <h6 className="font-weight-light">How long have you been playing?</h6>
                                        <ButtonOptions optionsList={playLengthOptions} onChange={this.onSelectPlayingLength} selectedList={this.state.playingLength} multiSelect={false} />
                                        <span />
                                        <h5>Preferences</h5>
                                        <h6 className="font-weight-light">Top 5 Favourite Artists</h6>
                                        <Form.Group className="d-flex search-field">
                                            <Form.Row>
                                                <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="topFiveArtistOne" value={this.state.topFiveArtistOne} />
                                                <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="topFiveArtistTwo" value={this.state.topFiveArtistTwo} />
                                                <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="topFiveArtistThree" value={this.state.topFiveArtistThree} />
                                                <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="topFiveArtistFour" value={this.state.topFiveArtistFour} />
                                                <Form.Control as="textarea" rows="1" className="h-auto" onChange={this.onChange} name="topFiveArtistFive" value={this.state.topFiveArtistFive} />
                                            </Form.Row>
                                        </Form.Group>
                                        <h6 className="font-weight-light">Spotifiy playlist</h6>
                                        <Form.Group className="d-flex search-field">
                                            <Form.Control as="textarea" rows="1" placeholder="Spotify link" size="lg" className="h-auto" onChange={this.onChange} name="spotifyPlaylist" value={this.state.spotifyPlaylist} />
                                        </Form.Group>
                                        <h6 className="font-weight-light">Youtube link</h6>
                                        <Form.Group className="d-flex search-field">
                                            <Form.Control as="textarea" rows="1" placeholder="Youtube link" size="lg" className="h-auto" onChange={this.onChange} name="youtubeLink" value={this.state.youtubeLink} />
                                        </Form.Group>

                                        <div className="mt-3">
                                            <button onClick={this.onSubmit} type="button" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SAVE</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withFirebase(EditUserProfile);

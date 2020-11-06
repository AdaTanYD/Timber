import React, { Component, useState } from 'react'
import { Form } from 'react-bootstrap';
import { withFirebase } from '../../BackEnd/Firebase';
import ButtonDisplays from '../CommonElements/buttonDisplays';
import Image from 'react-bootstrap/Image'

const INITIAL_STATE = {
    selectedInstruments: [],
    selectedGenres: [],
};

function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: {},
            username: "",
            isCurrentUser : false,
            ...INITIAL_STATE,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        var userID = this.props.match.params.uid
        var currentUser = await getCurrentUser(this.props.firebase.auth);
        var currentUserID = currentUser.uid
        if (userID === currentUserID) {
            this.setState({
                isCurrentUser: true
            })
        }
        this.props.firebase.users().on('value', snapshot => {
            if (snapshot.hasChild(userID)){
                currentUserID = userID
            }
            else {
                this.props.history.push(`/user/userprofile/${currentUserID}`)
            }
            
            this.setState({
                selectedInstruments: snapshot.child(currentUserID).child("selectedInstruments").val(),
                selectedGenres: snapshot.child(currentUserID).child("selectedGenres").val(),
                username: snapshot.child(currentUserID).child("username").val(),
                email: snapshot.child(currentUserID).child("email").val(),
                biography: snapshot.child(currentUserID).child("biography").val(),
                phoneNumber: snapshot.child(currentUserID).child("phoneNumber").val(),
                telegramHandle: snapshot.child(currentUserID).child("telegramHandle").val(),
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
                                    <div className="d-flex align-items-center flex-row" style={{ marginBottom: 24 }}>
                                        <div className="p-2">
                                            <Image src={require("../../../assets/images/faces/face1.jpg")} alt="profile" roundedCircle />
                                        </div>
                                        <div className="p-2 l-56">
                                            <h3>
                                                {this.state.username}
                                            </h3>
                                            {this.state.email ?
                                                <h6 className="font-weight-light">
                                                    {this.state.email}
                                                </h6>
                                                : null}
                                            <div className="d-flex align-items-center flex-row" >
                                                {this.state.phoneNumber ?
                                                    <h6 className="font-weight-light" style={{ marginRight: 32 }}>
                                                        {this.state.phoneNumber}
                                                    </h6> : null}
                                                {this.state.telegramHandle ?
                                                    <h6 className="font-weight-light">
                                                        {this.state.telegramHandle}
                                                    </h6> : null}
                                            </div>
                                        </div>
                                        {this.state.isCurrentUser ? 
                                        <div style={{ marginLeft: 64 }}>
                                            <h6><a href="/user/edituserprofile">Edit Profile</a></h6>
                                        </div> : null}
                                    </div>
                                    <div>
                                        <h5 className="font-weight-light">
                                            {this.state.biography ? this.state.biography : null}
                                        </h5>
                                        {this.state.spotifyPlaylist ?
                                            <a style={{ marginRight: 32 }} href={this.state.spotifyPlaylist}>{this.state.spotifyPlaylist}</a> : null
                                        }
                                        {this.state.youtubeLink ?
                                            <a href={this.state.youtubeLink}>{this.state.youtubeLink}</a> : null
                                        }
                                    </div>

                                    <Form className="pt-3">
                                        {this.state.selectedInstruments ?
                                            <div>
                                                <h6 className="font-weight-light">Instrument(s)</h6>
                                                <ButtonDisplays displayList={this.state.selectedInstruments} />
                                            </div>
                                            : null
                                        }
                                        {this.state.selectedGenres ?
                                            <div>
                                                <h6 className="font-weight-light">Preferred genres</h6>
                                                <ButtonDisplays displayList={this.state.selectedGenres} />
                                            </div> : null
                                        }
                                        <h5>Skills Level</h5>
                                        {this.state.skillsLevel ?
                                            <h6 className="font-weight-light">Skill level: {this.state.skillsLevel}</h6>
                                            : null
                                        }
                                        {this.state.performanceExperience ?
                                            <h6 className="font-weight-light">Performance Experience : {this.state.performanceExperience}</h6>
                                            : null
                                        }
                                        {this.state.playingLength ?
                                            <h6 className="font-weight-light">Playing Experience : {this.state.playingLength}</h6>
                                            : null
                                        }
                                        <div style={{ marginBottom: 24 }} />
                                        <h5>Preferences</h5>
                                        {this.state.topFiveArtistOne ?
                                            <div>
                                                <h6 className="font-weight-light">Top 5 Favourite Artists</h6>
                                                <h6 className="font-weight-light">{this.state.topFiveArtistOne}</h6>
                                                <h6 className="font-weight-light">{this.state.topFiveArtistTwo}</h6>
                                                <h6 className="font-weight-light">{this.state.topFiveArtistThree}</h6>
                                                <h6 className="font-weight-light">{this.state.topFiveArtistFour}</h6>
                                                <h6 className="font-weight-light">{this.state.topFiveArtistFive}</h6>
                                            </div>
                                            : null
                                        }


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

export default withFirebase(UserProfile);

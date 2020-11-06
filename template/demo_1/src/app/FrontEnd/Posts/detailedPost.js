import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../BackEnd/Firebase';
import Image from 'react-bootstrap/Image'
import InstrumentIcon from './instrumentIcon';
import JoinModal from './joinModal';
import JoinRequests from './JoinRequests/joinRequests';
import BandIcon from './bandIcon';

const INITIAL_STATE = {
    owner: null,
    description: null,
    selectedInstruments: [],
    selectedGenres: [],
    selectedGig: null,
    selectedCommiment: null,
    title: null,
    interestedList: null,
};

function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

export class DetailedPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            ownerUsername: null,
            isCurrentUser: false,
            joinModalShow: false,
            post: null,
            postID: null,
            ...INITIAL_STATE,
        };
    }

    setJoinModalShow(show) {
        this.setState({ joinModalShow: show });
    }
    
    async componentDidMount() {
        this.setState({ loading: true });
        var currentUser = await getCurrentUser(this.props.firebase.auth);
        var currentUserID = currentUser.uid
        var postID = this.props.match.params.uid
        this.props.firebase.posts().on('value', snapshot => {
            if (snapshot.hasChild(postID)) {
                this.setState({
                    owner: snapshot.child(postID).child("owner").val(),
                    description: snapshot.child(postID).child("description").val(),
                    selectedInstruments: snapshot.child(postID).child("selectedInstruments").val(),
                    selectedGenres: snapshot.child(postID).child("selectedGenres").val(),
                    selectedGig: snapshot.child(postID).child("selectedGig").val(),
                    selectedCommiment: snapshot.child(postID).child("selectedCommitment").val(),
                    title: snapshot.child(postID).child("title").val(),
                    interestedList: snapshot.child(postID).child("interestedList").val(),
                    post: snapshot.child(postID).val(),
                    postID: postID,
                    loading: false,
                });
                this.props.firebase.users().on('value', usersSnapshot => {
                    this.setState({
                        ownerUsername: usersSnapshot.child(snapshot.child(postID).child("owner").val()).child('username').val(),
                        ownerInstruments: usersSnapshot.child(snapshot.child(postID).child("owner").val()).child("selectedInstruments").val(),
                    })
                })
                if (snapshot.child(postID).child("owner").val() === currentUserID) {
                    this.setState({
                        isCurrentUser: true
                    })
                }
            }
            else {
                this.props.history.push(ROUTES.EDIT_PROFILE)
            }

        });
    }

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
                                    <h3>
                                        {this.state.title ? this.state.title : null}
                                    </h3>
                                    <a href={`/user/userprofile/${this.state.owner}`}>
                                        <div className="d-flex align-items-center flex-row" style={{ marginBottom: 24 }}>
                                            <div className="p-2">
                                                <Image src={require("../../../assets/images/faces/face1.jpg")} alt="profile" roundedCircle />
                                            </div>
                                            <div className="p-2 l-56">
                                                <h4>
                                                    {this.state.ownerUsername}
                                                </h4>
                                            </div>
                                        </div>
                                    </a>

                                    <Form className="pt-3">
                                        {this.state.description ?
                                            <div style={{ margin: 24 }}>
                                                {this.state.description}
                                            </div> : null
                                        }
                                        {this.state.ownerInstruments ?
                                            <h6 className="font-weight-light">
                                                Plays:
                                            <div className="d-flex align-items-left auth px-0 flex-wrap">
                                                    {this.state.ownerInstruments.map(
                                                        (instrument) =>
                                                            <InstrumentIcon instrument={instrument} diameter={70} />
                                                    )}
                                                </div>
                                            </h6>
                                            : null
                                        }
                                        {this.state.selectedInstruments ?
                                            <h6 className="font-weight-light">
                                                Looking for:
                                            <div className="d-flex align-items-left auth px-0 flex-wrap">
                                                    <BandIcon postID={this.state.postID} diameter={70} selectedInstruments={this.state.selectedInstruments}/>
                                                </div>
                                            </h6>
                                            : null}
                                        <div className="detailed information" style={{ marginTop: 36 }}>
                                            {this.state.selectedGenres ?
                                                <div style={{ marginBottom: 12 }}>
                                                    <h6 className="font-weight-light">Genre: </h6>
                                                    {this.state.selectedGenres}
                                                </div> : null
                                            }
                                            {this.state.selectedGig ?
                                                <div style={{ marginBottom: 12 }}>
                                                    <h6 className="font-weight-light">Gig opportunities: </h6>
                                                    {this.state.selectedGig}
                                                </div> : null
                                            }
                                            {this.state.selectedCommiment ?
                                                <div style={{ marginBottom: 12 }}>
                                                    <h6 className="font-weight-light">Expected commitment level: </h6>
                                                    {this.state.selectedCommiment}
                                                </div> : null
                                            }
                                        </div >
                                        {
                                            this.state.isCurrentUser && this.state.interestedList ?
                                                <div>
                                                    <JoinRequests interestedList={this.state.interestedList} postID={this.state.postID} />
                                                </div>
                                                :
                                                <div className="mt-3">
                                                    <button type="button" onClick={() => this.setState({ joinModalShow: true })} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">+ Join</button>
                                                </div>
                                        }

                                    </Form>
                                    <JoinModal
                                        show={this.state.joinModalShow}
                                        onHide={() => this.setJoinModalShow(false)}
                                        post={this.state.post}
                                        postID={this.state.postID}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withFirebase(DetailedPost);

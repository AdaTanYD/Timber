import React, { Component } from 'react'
import { withFirebase } from '../../BackEnd/Firebase';
import Image from 'react-bootstrap/Image';
import InstrumentIcon from './instrumentIcon';
import JoinModal from './joinModal';



export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            ownerUsername: "",
            ownerInstruments: [],
            joinModalShow: false,
        };
    }

    setJoinModalShow = (modalShow) => {
        this.setState({
            joinModalShow: modalShow,
        })
    }

    componentDidMount() {
        this.props.firebase.users().on('value', snapshot => {
            this.setState({
                ownerUsername: snapshot.child(this.props.details.owner).child("username").val(),
                ownerInstruments: snapshot.child(this.props.details.owner).child("selectedInstruments").val(),
                loading: false,
            });
        });
    }

    render() {
        return (
            <div className="auth-form-light text-left py-2 px-2  mx-2 my-2" style={{ width: 250, height: 400, position: 'relative' }}>
                <div className="p-2">
                    <div className="d-flex align-items-center auth px-0 flex-row">
                        <a href={`/user/userprofile/${this.props.details.owner}`}>
                            <Image src={require("../../../assets/images/faces/face1.jpg")} alt="profile" roundedCircle style={{ width: 50, height: 50 }} />
                        </a>
                        <h6 style={{ marginLeft: 12 }}>
                            {this.state.ownerUsername}
                        </h6>
                    </div>
                </div>
                {this.props.details.title ?
                    <h5>
                        {this.props.details.title}
                    </h5>
                    : null
                }
                {this.state.ownerInstruments ?
                    <h6 className="font-weight-light">
                        Plays:
                            <div className="d-flex align-items-left auth px-0 flex-wrap">
                            {this.state.ownerInstruments.map(
                                (instrument) =>
                                    <InstrumentIcon instrument={instrument} />
                            )}
                        </div>
                    </h6>
                    : null
                }
                <span />
                {this.props.details.selectedGenres ?
                    <h6 className="font-weight-light">
                        Genre: {this.props.details.selectedGenres}
                    </h6>
                    :
                    null
                }
                {this.props.details.selectedInstruments ?
                    <h6 className="font-weight-light">
                        Looking for:
                            <div className="d-flex align-items-left auth px-0 flex-wrap">
                            {this.props.details.selectedInstruments.map(
                                (instrument) =>
                                    <InstrumentIcon instrument={instrument} />
                            )}
                        </div>
                    </h6>
                    : null}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                    <a href={`/post/${this.props.postID}`} className="font-weight-light" style={{ fontSize: 14 }}>read more</a>
                </div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                    <button className="btn btn-block btn-primary btn-sm font-weight-light auth-form-btn" to="/dashboard" onClick={()=>{this.setJoinModalShow(true)}}>+ Join</button>
                </div>
                <JoinModal
                    show={this.state.joinModalShow}
                    onHide={() => this.setJoinModalShow(false)}
                    post={this.props.details}
                    postID={this.props.postID}
                />
            </div>
        )
    }
}

export default withFirebase(Post);

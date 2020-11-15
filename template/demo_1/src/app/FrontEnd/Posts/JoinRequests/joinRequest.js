import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../../BackEnd/Firebase';
import Image from 'react-bootstrap/Image'
import AcceptModal from './acceptModal';
import DeclineModal from './declineModal';

function JoinRequest(props) {
    const [username, setUsername] = useState(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);

    useEffect(() => {
        props.firebase.users().on('value', usersSnapshot => {
            setUsername(usersSnapshot.child(props.details.user).child('username').val())
        })
    }, [props.details]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center flex-row" style={{ marginBottom: 24 }}>
                <div className="d-flex align-items-center flex-row" >
                    <a href={`/user/userprofile/${props.details.user}`}>
                        <div className="p-2">
                            <Image src={require("../../../../assets/images/faces/face1.jpg")} alt="profile" roundedCircle />
                        </div>
                    </a>
                    <div>
                        <h5>
                            {username}
                        </h5>
                        {props.details.joinInstrument ?
                            <h6>
                                Instrument: {props.details.joinInstrument}
                            </h6> : null
                        }
                        {props.details.joinComment ?
                            <h6>
                                Comment: {props.details.joinComment}
                            </h6> : null
                        }
                    </div>
                </div>
                <div className="d-flex align-items-center flex-row" >

                    <button type="button" onClick={() => setShowAcceptModal(true)} className="btn btn-block btn-success btn-sm font-weight-medium auth-form-btn" >Accept</button>
                    <div className="mx-20">
                    </div>
                    <button type="button" onClick={() => setShowDeclineModal(true)} className="btn btn-block btn-danger btn-sm font-weight-medium auth-form-btn">Decline</button>
                </div>
                <AcceptModal
                    show={showAcceptModal}
                    onHide={() => setShowAcceptModal(false)}
                    details={props.details}
                    postID={props.postID}
                    requestID={props.requestID}
                />
                <DeclineModal
                    show={showDeclineModal}
                    onHide={() => setShowDeclineModal(false)}
                    details={props.details}
                    postID={props.postID}
                    requestID={props.requestID}
                />
            </div>
        </div>
    );
}

export default withFirebase(JoinRequest);
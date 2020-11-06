import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../../BackEnd/Firebase';
import Image from 'react-bootstrap/Image'

function JoinRequest(props) {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        props.firebase.users().on('value', usersSnapshot => {
            setUsername(usersSnapshot.child(props.details.user).child('username').val())
        })
    }, props.details);

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
                    <div>
                        another button here
                    </div>
                    <div>
                        button here
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withFirebase(JoinRequest);
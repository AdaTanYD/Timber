import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../../BackEnd/Firebase';
import Image from 'react-bootstrap/Image'

function JoinRequest(props) {
    const [username, setUsername] = useState(null);

    async function checkInstrumentTaken(instrument) {
        var result = false
        await props.firebase.posts().on('value', snapshot => {
            const acceptedList = snapshot.child(props.postID).child("acceptedList").val()
            
            if (acceptedList === null) {
                return false
            }
            
            Object.keys(acceptedList).map((key) => {
                if (acceptedList[key]["joinInstrument"].includes(instrument)) {
                    result = true
                }
            })
        })
        return result
    }
    async function acceptRequest() {
        var joinData = {
            user: props.details.user,
            joinInstrument: props.details.joinInstrument,
            joinComment: props.details.joinComment,
        }
        console.log("this is the awaited thing")
        console.log(await checkInstrumentTaken(props.details.joinInstrument[0]))
        if (await checkInstrumentTaken(props.details.joinInstrument[0])) {
            // instrument already taken, insert some modal to ask user to delete and kick
            console.log("instrument already taken");
        }
        
        else {
            //add to accepted list
            await props.firebase
                .post(props.postID).child("acceptedList")
                .push(joinData).then(() => {
                    console.log(joinData)
                }
                );
            await props.firebase.post(props.postID).child("interestedList").child(props.requestID).remove();
        }
    }

    async function declineRequest() {
        var joinData = {
            user: props.details.user,
            joinInstrument: props.details.joinInstrument,
            joinComment: props.details.joinComment,
        }
        //add to decline list
        await props.firebase
            .post(props.postID).child("declinedList")
            .push(joinData).then(() => {
                console.log(joinData)
            }
            );
        await props.firebase.post(props.postID).child("interestedList").child(props.requestID).remove();

    }
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

                    <button type="button" onClick={acceptRequest} className="btn btn-block btn-success btn-sm font-weight-medium auth-form-btn" >Accept</button>
                    <div className="mx-20">
                    </div>
                    <button type="button" onClick={declineRequest} className="btn btn-block btn-danger btn-sm font-weight-medium auth-form-btn">Decline</button>
                </div>
            </div>
        </div>
    );
}

export default withFirebase(JoinRequest);
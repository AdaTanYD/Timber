import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonOptions from '../CommonElements/buttonOptions';
import { Form } from 'react-bootstrap';
import { withFirebase } from '../../BackEnd/Firebase';
import ConfirmationModal from './confirmationModal';


const instrumentOptions =
    [{ "option": 'Electric Guitar', "icon": "mdi mdi-guitar-electric btn-icon-prepend mdi-24px" },
    { "option": 'Acoustic Guitar', "icon": "mdi mdi-guitar-acoustic btn-icon-prepend mdi-24px" },
    { "option": 'Drums', "icon": "mdi mdi-music-circle btn-icon-prepend mdi-24px" },
    { 'option': 'Keys', "icon": "mdi mdi-music-circle btn-icon-prepend mdi-24px" },
    { "option": 'Vocals', "icon": "mdi mdi-microphone-variant btn-icon-prepend mdi-24px" },
    { "option": 'Others', "icon": "mdi mdi-saxophone btn-icon-prepend mdi-24px" }
    ];
    
function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}



function mapInstruments(instrumentList) {
    return instrumentList.flatMap((instrument) => {
        return instrumentOptions.filter((instrumentOption) => {
            if (instrument === instrumentOption.option) {
                return instrumentOption
            }
        })
    })
}
function JoinModal(props) {
    const [confirmationModalShow, setConfirmationModalShow] = useState(false);
    const [joinInstrument, setJoinInstrument] = useState(null);
    const [joinComment, setJoinComment] = useState("");
    const [show, setShow] = useState(true);

    function setComment(comment) {
        setJoinComment(comment.target.value)
    }

    async function onClickSendRequest() {
        var currentUser = await getCurrentUser(props.firebase.auth);
        var currentUserID = currentUser.uid
        var joinData = {
            user: currentUserID,
            joinInstrument: joinInstrument,
            joinComment: joinComment,
        }
        await props.firebase
            .post(props.postID).child("interestedList")
            .push(joinData).then(() => {
                setConfirmationModalShow(true)
                setShow(false);
            }
            );
    }
    
    return (
        <>
        {show ? 
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Send Join Request
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="font-weight-light">What instrument do you play?</h6>
                    {props.post.selectedInstruments ?
                        <h6 className="font-weight-light">
                            <ButtonOptions optionsList={mapInstruments(props.post.selectedInstruments)} onChange={setJoinInstrument} selectedList={joinInstrument} multiSelect={false} />
                        </h6>
                        : null}
                    <h6 className="font-weight-light">Any Comments?</h6>
                    <Form.Control as="textarea" rows="2" placeholder="Comment" size="md" className="h-auto" onChange={setComment} name="comment" value={joinComment} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClickSendRequest}>Send Request</Button>
                </Modal.Footer>
            </Modal>
            : 
            null}
            <ConfirmationModal
                show={confirmationModalShow}
                onHide={() => setConfirmationModalShow(false)}
            />
        </>
    );
}

export default withFirebase(JoinModal);
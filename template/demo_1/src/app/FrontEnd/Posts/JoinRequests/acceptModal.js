import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ConfirmationModal from '../confirmationModal';
import { withFirebase } from '../../../BackEnd/Firebase';

function AcceptModal(props) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showError, setShowError] = useState(false);

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
            setShowError(true);
            props.onHide()
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
            props.onHide()
            setShowConfirmation(true);
        }
    }

    return (
        <>
            
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirm acceptance
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="font-weight-light">Are you sure you want to accept?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={acceptRequest}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            
            <ConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                title="Success"
                body="Request accepted"
            />
            <ConfirmationModal
                show={showError}
                onHide={() => setShowError(false)}
                title="Error!!"
                body="The instrument is already taken by someone else. If you want to confirm another person, please edit your post"
            />
        </>
    );
}

export default withFirebase(AcceptModal);
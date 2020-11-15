import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ConfirmationModal from '../confirmationModal';
import { withFirebase } from '../../../BackEnd/Firebase';

function DeclineModal(props) {
    const [showConfirmation, setShowConfirmation] = useState(false);

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
        setShowConfirmation(true);
        props.onHide()
        
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
                        Confirm declination
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="font-weight-light">Are you sure you want to decline?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={declineRequest}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            <ConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                title="Success"
                body="Request declined"
            />
        </>
    );
}

export default withFirebase(DeclineModal);
import React from 'react';
import JoinRequest from './joinRequest';

function JoinRequests(props) {

    return (
        <div style={{ marginTop: 24 }}>
            {props.interestedList ?
                <>
                <h4>
                Join Requests
                </h4>
                    {Object.keys(props.interestedList).map((key) => <JoinRequest key={key} details={props.interestedList[key]} requestID={key} postID={props.postID} />)}
                </>
                : null
            }
        </div>
    );
}

export default JoinRequests;
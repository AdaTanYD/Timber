import React, { useState, useEffect, useMemo } from 'react';
import InstrumentIcon from './instrumentIcon';
import { withFirebase } from '../../BackEnd/Firebase';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function BandIcon(props) {
    const [acceptedList, setAcceptedList] = useState(null);

    useEffect(() => {
        props.firebase.posts().on('value', usersSnapshot => {
            setAcceptedList(usersSnapshot.child(props.postID).child('acceptedList').val())
        })
    }, [props.postID]);

    const instrumentList = useMemo(() => {
        var list = props.selectedInstruments
        if (acceptedList !== null) {
            Object.keys(acceptedList).map((key) => {
                list = list.filter(instrument => acceptedList[key]["joinInstrument"] !== instrument)
            })
            return list
        }
        return list
    }, [acceptedList, props.selectedInstruments])

    return (
        <div style={{ marginTop: 24 }} className="d-flex align-items-left auth px-0 flex-wrap">
            {acceptedList ?
                Object.keys(acceptedList).map((key) =>
                    <div>
                        <a href={`/user/userprofile/${acceptedList[key]["user"]}`}>
                            <OverlayTrigger
                                placement={'bottom'}
                                overlay={
                                    <Tooltip>
                                        {acceptedList[key]["joinInstrument"]}
                                    </Tooltip>
                                }
                            >
                                <Image src={require(`../../../assets/images/faces/face1.jpg`)} alt="profile" roundedCircle style={{ width: props.diameter ? props.diameter : 50, height: props.diameter ? props.diameter : 50 }} />
                            </OverlayTrigger>
                        </a>
                    </div>
                )
                : null
            }
            {instrumentList ?
                instrumentList.map(
                    (instrument) =>
                        <InstrumentIcon instrument={instrument} diameter={props.diameter ? props.diameter : 50} />
                )
                : null}
        </div>
    );
}

export default withFirebase(BandIcon);
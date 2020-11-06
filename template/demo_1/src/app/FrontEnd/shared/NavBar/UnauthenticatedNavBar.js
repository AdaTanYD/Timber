import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { withFirebase } from '../../../BackEnd/Firebase';
import * as ROUTES from '../../../constants/routes';

class UnauthenticatedNavbar extends Component {
    render() {
        return (
            <>
                <li className="nav-item d-none d-lg-block">
                    <a className="nav-link" href={ROUTES.SIGN_IN}>
                        <h6 > Login </h6>
                    </a>
                </li>
                <li className="nav-item d-none d-lg-block">
                    <a className="nav-link" href={ROUTES.SIGN_UP}>
                        <h6 > Register </h6>
                    </a>
                </li>
            </>

        );
    }
}

export default withFirebase(UnauthenticatedNavbar);

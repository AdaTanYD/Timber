import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { withFirebase } from '../../../BackEnd/Firebase';
import * as ROUTES from '../../../constants/routes';

class AuthenticatedNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: '',
        };
    }

    toggleRightSidebar() {
        document.querySelector('.right-sidebar').classList.toggle('open');
    }

    onSignOut(event) {
        this.props.firebase.doSignOut();
        event.preventDefault()
    }
    
    componentDidMount() {
        this.setState({ loading: true });
        var currentUserID = this.props.authUser.uid
        this.props.firebase.users().on('value', snapshot => {
            this.setState({
                username: snapshot.child(currentUserID).child("username").val(),
                loading: false,
            });
        });
    }

    render() {
        return (
            <>
                <li className="nav-item nav-profile">
                    <Dropdown alignRight>
                        <Dropdown.Toggle className="nav-link">
                            <div className="nav-profile-img">
                                <img src={require("../../../../assets/images/faces/face1.jpg")} alt="user" />
                                <span className="availability-status online"></span>
                            </div>
                            <div className="nav-profile-text">
                                <p className="mb-1 text-black"><Trans>{this.state.loading ? null : this.state.username}</Trans></p>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="navbar-dropdown">
                            <Dropdown.Item href={ROUTES.USER_PROFILE}>
                                <i className="mdi mdi-cached mr-2 text-success"></i>
                                <Trans>User Profile</Trans>
                            </Dropdown.Item>
                            <Dropdown.Item href="!#" onClick={event => this.onSignOut(event)}>
                                <i className="mdi mdi-logout mr-2 text-primary"></i>
                                <Trans>Signout</Trans>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="nav-item">
                    <Dropdown alignRight>
                        <Dropdown.Toggle className="nav-link count-indicator">
                            <i className="mdi mdi-email-outline"></i>
                            <span className="count-symbol bg-warning"></span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="preview-list navbar-dropdown">
                            <h6 className="p-3 mb-0"><Trans>Messages</Trans></h6>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                                <div className="preview-thumbnail">
                                    <img src={require("../../../../assets/images/faces/face4.jpg")} alt="user" className="profile-pic" />
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>Mark send you a message</Trans></h6>
                                    <p className="text-gray mb-0">
                                        1 <Trans>Minutes ago</Trans>
                                    </p>
                                </div>
                            </Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                                <div className="preview-thumbnail">
                                    <img src={require("../../../../assets/images/faces/face2.jpg")} alt="user" className="profile-pic" />
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>Cregh send you a message</Trans></h6>
                                    <p className="text-gray mb-0">
                                        15 <Trans>Minutes ago</Trans>
                                    </p>
                                </div>
                            </Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                                <div className="preview-thumbnail">
                                    <img src={require("../../../../assets/images/faces/face3.jpg")} alt="user" className="profile-pic" />
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>Profile picture updated</Trans></h6>
                                    <p className="text-gray mb-0">
                                        18 <Trans>Minutes ago</Trans>
                                    </p>
                                </div>
                            </Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <h6 className="p-3 mb-0 text-center cursor-pointer">4 <Trans>new messages</Trans></h6>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="nav-item">
                    <Dropdown alignRight>
                        <Dropdown.Toggle className="nav-link count-indicator">
                            <i className="mdi mdi-bell-outline"></i>
                            <span className="count-symbol bg-danger"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                            <h6 className="p-3 mb-0"><Trans>Notifications</Trans></h6>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-success">
                                        <i className="mdi mdi-calendar"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1"><Trans>Event today</Trans></h6>
                                    <p className="text-gray ellipsis mb-0">
                                        <Trans>Just a reminder that you have an event today</Trans>
                                    </p>
                                </div>
                            </Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-warning">
                                        <i className="mdi mdi-settings"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1"><Trans>Settings</Trans></h6>
                                    <p className="text-gray ellipsis mb-0">
                                        <Trans>Update dashboard</Trans>
                                    </p>
                                </div>
                            </Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-info">
                                        <i className="mdi mdi-link-variant"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1"><Trans>Launch Admin</Trans></h6>
                                    <p className="text-gray ellipsis mb-0">
                                        <Trans>New admin wow</Trans>!
                      </p>
                                </div>
                            </Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <h6 className="p-3 mb-0 text-center cursor-pointer"><Trans>See all notifications</Trans></h6>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="nav-item nav-settings d-none d-lg-block">
                    <button type="button" className="nav-link border-0" onClick={this.toggleRightSidebar} >
                        <i className="mdi mdi-format-line-spacing"></i>
                    </button>
                </li>
            </>

        );
    }
}

export default withFirebase(AuthenticatedNavbar);

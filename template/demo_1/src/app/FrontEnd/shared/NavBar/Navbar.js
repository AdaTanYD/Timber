import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { withFirebase } from '../../../BackEnd/Firebase';
import AuthenticatedNavBar from './AuthenticatedNavBar';
import UnAuthenticatedNavbar from './UnauthenticatedNavBar';

class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  onSignOut(event) {
    this.props.firebase.doSignOut();
    event.preventDefault()
  }
  render() {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/"><img src={require('../../../../assets/images/logo.svg')} alt="logo" /></Link>
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../../../assets/images/logo-mini.svg')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
            <span className="mdi mdi-menu"></span>
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            {this.props.authUser ?
            <AuthenticatedNavBar authUser = {this.props.authUser}/>
              :
              <UnAuthenticatedNavbar/>
            }
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>

        </div>
      </nav>
    );
  }
}

export default withFirebase(Navbar);

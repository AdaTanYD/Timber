import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import * as ROUTES from '../../../constants/routes';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/advanced-ui', state: 'advancedUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/maps', state: 'mapsMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/general-pages', state: 'generalPagesMenuOpen' },
      { path: '/ecommerce', state: 'ecommercePagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">

          <li className={this.isPathActive(ROUTES.POST_LISTINGS) ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to={ROUTES.POST_LISTINGS}>
              <span className="menu-title"><Trans>Listings</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          {this.props.authUser ?
            <li className={this.isPathActive(ROUTES.CREATE_POST) ? 'nav-item active' : 'nav-item'}>
              <Link className="nav-link" to={ROUTES.CREATE_POST}>
                <span className="menu-title"><Trans>Create Post</Trans></span>
                <i className="mdi mdi-plus menu-icon"></i>
              </Link>
            </li>
            :
            null
          }
          {/* <li className={this.isPathActive('/general-pages') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.generalPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('generalPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>General Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </div>
            <Collapse in={this.state.generalPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive(ROUTES.CREATE_POST) ? 'nav-link active' : 'nav-link'} to={ROUTES.CREATE_POST}><Trans>Create Post</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive(ROUTES.EDIT_PROFILE) ? 'nav-link active' : 'nav-link'} to={ROUTES.EDIT_PROFILE}><Trans>Edit Profile</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive(ROUTES.USER_PROFILE) ? 'nav-link active' : 'nav-link'} to={ROUTES.USER_PROFILE}><Trans>User Profile</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-title"><Trans>Documentation</Trans></span>
              <i className="mdi mdi-file-document-box menu-icon"></i>
            </a>
          </li> */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);
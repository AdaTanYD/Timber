import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './FrontEnd/shared/NavBar/Navbar';
import Sidebar from './FrontEnd/shared/SideBar/Sidebar';
import SettingsPanel from './FrontEnd/shared/SettingsPanel';
import Footer from './FrontEnd/shared/Footer';
import * as ROUTES from './constants/routes';
import {withFirebase} from './BackEnd/Firebase';

class App extends Component {
  state = {
    authUser: null,
  }
  componentDidMount() {
    this.onRouteChanged();
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar authUser={this.state.authUser}/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar authUser={this.state.authUser}/> : '';
    let SettingsPanelComponent = !this.state.isFullPageLayout ? <SettingsPanel/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className="container-scroller">
        { navbarComponent }
        <div className="container-fluid page-body-wrapper">
          { sidebarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
              { SettingsPanelComponent }
              {console.log(this.state.authUser)}
              {/* {this.state.authUser === null ? <Redirect to={ROUTES.SIGN_IN}/> : null} */}
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [ROUTES.SIGN_UP, ROUTES.SIGN_IN, '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default(withRouter(withFirebase((App))));

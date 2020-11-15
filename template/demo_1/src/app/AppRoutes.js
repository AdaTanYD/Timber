import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/FrontEnd/shared/Spinner';
import * as ROUTES from './constants/routes';


const Error404 = lazy(() => import('./FrontEnd/ErrorPages/Error404'));
const Error500 = lazy(() => import('./FrontEnd/ErrorPages/Error500'));

const Login = lazy(() => import('./FrontEnd/user-pages/Login'));
const Register = lazy(() => import('./FrontEnd/user-pages/Register'));

const CreatePostPage = lazy(() => import('./FrontEnd/Posts/CreatePosts/postForm'));
const PostListingsPage = lazy(() => import('./FrontEnd/Posts/MainPostsPage'));
const DetailedPost = lazy(() => import('./FrontEnd/Posts/detailedPost'));

const UserPostsPage = lazy(() => import('./FrontEnd/Posts/UserPostsPage'));

const EditUserProfile = lazy(() => import('./FrontEnd/UserProfile/editUserProfile'));
const UserProfile = lazy(() => import('./FrontEnd/UserProfile/userProfile'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>


          <Route path={ROUTES.SIGN_IN} component={ Login } />
          <Route path={ROUTES.SIGN_UP} component={ Register } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Route path={ROUTES.CREATE_POST} component={CreatePostPage} />
          <Route path={ROUTES.POST_LISTINGS} component={PostListingsPage} />
          <Route path={ROUTES.DETAILED_POST} component={DetailedPost} />

          <Route path={ROUTES.USER_POSTS} component={UserPostsPage} />

          <Route path={ROUTES.EDIT_PROFILE} component={EditUserProfile} />
          <Route path={ROUTES.USER_PROFILE} component={UserProfile}/>

          
          <Redirect to={ROUTES.POST_LISTINGS}/>
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
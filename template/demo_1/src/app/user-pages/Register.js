import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

export class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            selectedInstruments: [],
            selectedGenres: [],
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" name="username" onChange={this.onChange} id="exampleInputUsername1" placeholder="Username" value={username} />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" name="email" onChange={this.onChange} id="exampleInputEmail1" placeholder="Email" value={email} />
                  </div>
                  <div className="form-group">
                    <input type="password" name="passwordOne" onChange={this.onChange} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" value={passwordOne} />
                  </div>
                  <div className="form-group">
                    <input type="password" name="passwordTwo" onChange={this.onChange} className="form-control form-control-lg" id="exampleInputPassword2" placeholder="Confirm Password" value={passwordTwo} />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button disabled={isInvalid} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard" onClick={this.onSubmit}>SIGN UP</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    {error && <p>{error.message}</p>}
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const SignUpPage = withFirebase(Register)

export default SignUpPage

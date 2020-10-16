import React, { Component } from 'react'
import { FirebaseContext } from '../Firebase';
import { Form } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { withAuthUser } from '../Session';
import { Link } from 'react-router-dom';
import InstrumentOptions from './instrumentOptions';
import GenreOptions from './genreOptions';

export class PostForm extends Component {
    render() {
        return (
            <div>
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-12 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                    <img src={require("../../assets/images/logo.svg")} alt="logo" />
                                </div>
                                <h4>Looking for new band mates?</h4>
                                <h6 className="font-weight-light">Lets get started!</h6>
                                <Form className="pt-3">
                                    <h6 className="font-weight-light">What instrument(s) do you play?</h6>
                                    <InstrumentOptions />
                                    <h6 className="font-weight-light">What instrument(s) are you looking for?</h6>
                                    <InstrumentOptions />
                                    <h6 className="font-weight-light">What genre(s) are you planning to play?</h6>
                                    <GenreOptions />
                                    <h6 className="font-weight-light">General Description</h6>
                                    <Form.Group className="d-flex search-field">
                                        <Form.Control as="textarea" rows="3" placeholder="Tell your future bandmates something!" size="lg" className="h-auto" onChange={this.onChange} name="spotify link" />
                                    </Form.Group>
                                    <div className="mt-3">
                                        <button onClick={this.onSubmit} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">CREATE POST</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withFirebase(PostForm);

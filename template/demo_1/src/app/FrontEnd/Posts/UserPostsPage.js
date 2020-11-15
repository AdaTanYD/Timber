import React, { Component } from 'react';
import { withFirebase } from '../../BackEnd/Firebase';
import Post from './Post'

function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

export class UserPostsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: {},
            currentUserID: null,
        };
    }

    async componentDidMount() {
        var currentUser = await getCurrentUser(this.props.firebase.auth);
        var currentUserID = currentUser.uid
        this.setState({ loading: true });
        this.props.firebase.posts().on('value', snapshot => {
            this.setState({
                posts: snapshot.val(),
                currentUserID: currentUserID,
                loading: false,
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.loading ?
                    <div>
                        Loading...
                    </div>
                    :
                    <div className="d-flex align-items-left auth px-0 flex-wrap">
                        {this.state.posts ?
                            Object.keys(this.state.posts).
                            filter(
                                key => this.state.posts[key].owner === this.state.currentUserID
                            ).
                            reverse().map((key) => <Post key={key} details={this.state.posts[key]} postID={key} />)
                            :
                            null
                        }
                    </div>
                }
            </div>
        )
    }
}

export default withFirebase(UserPostsPage);

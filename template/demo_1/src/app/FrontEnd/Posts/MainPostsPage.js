import React, { Component } from 'react';
import { withFirebase } from '../../BackEnd/Firebase';
import Post from './Post'

export class MainPostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: {},
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.posts().on('value', snapshot => {
            this.setState({
                posts: snapshot.val(),
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
                            Object.keys(this.state.posts).reverse().map((key) => <Post key={key} details={this.state.posts[key]} postID={key} />)
                            :
                            null
                        }
                    </div>
                }
            </div>
        )
    }
}

export default withFirebase(MainPostPage);

import React, { Component } from 'react'
import  { FirebaseContext } from '../Firebase';

export class BlankPage extends Component {
  render() {
    return (
      <div>
        <FirebaseContext.Consumer>
          {firebase => {
            console.log(firebase)
            return <div>I've access to Firebase and render something.</div>;
          }}
        </FirebaseContext.Consumer>
      </div>
    )
  }
}

export default BlankPage

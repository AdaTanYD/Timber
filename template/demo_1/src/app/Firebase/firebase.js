import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDuWLHbe79_lXu09-P7PAq3_-TaGDzktdQ",
    authDomain: "timbermusic-f2347.firebaseapp.com",
    databaseURL: "https://timbermusic-f2347.firebaseio.com",
    projectId: "timbermusic-f2347",
    storageBucket: "timbermusic-f2347.appspot.com",
    messagingSenderId: "469843222315",
    appId: "1:469843222315:web:931de081fc8434230f2f6e",
    measurementId: "G-MCV853TYLN",
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);
  
  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();
  
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}
 
export default Firebase;
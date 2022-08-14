import firebase from "firebase/compat/app";

import "firebase/compat/auth";

import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/ChatRoom";

import "./App.css";

firebase.initializeApp({
  apiKey: "AIzaSyAhUHGAn1O0cmxK57sZyLjlkIH-lk9vck4",
  authDomain: "chat-app-24ee2.firebaseapp.com",
  projectId: "chat-app-24ee2",
  storageBucket: "chat-app-24ee2.appspot.com",
  messagingSenderId: "170614799261",
  appId: "1:170614799261:web:5ae9c9f438217d71ae0d74",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  console.log(user);
  return (
    <div className="App">
      {user ? (
        <>
          <ChatRoom firestore={firestore} firebase={firebase} auth={auth} />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App;

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

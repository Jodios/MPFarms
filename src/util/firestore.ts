import firebase from "firebase";
import {firebaseConfig} from "../firebaseconfig";

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();



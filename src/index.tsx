import ReactDOM from 'react-dom';
import React from 'react';
import firebase from "firebase";
import {firebaseConfig} from "./firebaseconfig";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import Navbar from "./components/NavbarV2/Navbar";
import Blogs from "./pages/Blogs/blogs"
import About from "./pages/About/about"
import Store from "./pages/Store/store"
import Home from "./pages/Home/home"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./index.css";

const App = () => {
    return (
        <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/blogs' component={Blogs} />
                    <Route path='/about' component={About} />
                    <Route path='/store' component={Store} />
                </Switch>
            </Router>
        </FirebaseAuthProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root') );
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { NavLink as Link } from "react-router-dom";
import firebase from "firebase";
import "./Navbar.css"
import fbLoginIcon from "../../resources/icons/fbLogin3.png";
import googleLoginIcon from "../../resources/icons/googleLogin.png";
import mpFarmsLogo from "../../resources/icons/mp-farms.png";
import "../../util/firebase";
export default class MyNavbar extends React.Component {

    state = {clicked: false, provider: null};

    toggleBars = () => {
        this.setState({clicked: !this.state.clicked});
    }

    login = (provider: firebase.auth.AuthProvider) => {
        this.setState({provider: (provider instanceof firebase.auth.FacebookAuthProvider) ? "facebook":"google"})
        firebase.auth().signInWithPopup(provider);
    }

    logout = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <FirebaseAuthConsumer>
                {({ user, firebase, providerId, isSignedIn }) => {
                    let profilePicture;
                    let authButton;
                    let googleLoginButton;
                    let facebookLoginButton;
                    if (isSignedIn) {
                        googleLoginButton = null;
                        facebookLoginButton = null;
                        profilePicture = 
                            <div>
                                <img src={user.photoURL} alt="profile" className={(this.state.provider === "facebook"? "facebookProfilePicture": "googleProfilePicture")} /><br/>
                            </div>;
                        authButton =
                            <div onClick={() => {this.logout(); this.toggleBars();}} className="nav-link">Sign Out</div>;
                    } else {
                        profilePicture = null;
                        authButton =
                            <div onClick={() => {this.login(new firebase.auth.FacebookAuthProvider()); this.toggleBars();}} className="nav-link">Sign In</div>;
                        facebookLoginButton = 
                            <img alt="Facebook Login" src={fbLoginIcon} className="loginButton" onClick={() => this.login(new firebase.auth.FacebookAuthProvider())}/>
                        googleLoginButton = 
                            <img alt="Google Login" src={googleLoginIcon} className="loginButton" onClick={() => this.login(new firebase.auth.GoogleAuthProvider())}/>
                    }
                    return (
                        <>
                            <Navbar variant="dark" className="myNav" sticky="top">
                                {/* <Link to="/"><Navbar.Brand>MPFarms</Navbar.Brand></Link> */}
                                <Navbar.Brand style={{"textAlign": "left"}}>
                                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"} onClick={this.toggleBars}></i>
                                    <Link to="/" className="homeLink"><img src={mpFarmsLogo} className="navBrand" alt="home logo"/></Link>
                                </Navbar.Brand>
                                <Nav className="mr-auto"/>
                                {googleLoginButton}
                                {facebookLoginButton}
                                {profilePicture}
                            </Navbar>
                            <div className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                                <Link to="/store" className="nav-link" onClick={this.toggleBars}>Store</Link>
                                <Link to="/blogs" className="nav-link" onClick={this.toggleBars}>Blog</Link>
                                <Link to="/about" className="nav-link" onClick={this.toggleBars}>About Us</Link>
                                <div></div>
                                {authButton}
                            </div>
                            {/* <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                                <li><Link to="/blogs" className="nav-link" onClick={this.toggleBars}>Blog</Link></li>
                                <li><Link to="/about" className="nav-link" onClick={this.toggleBars}>About</Link></li>
                            </ul> */}
                        </>
                    )
                }}
            </FirebaseAuthConsumer>
        )
    }


}
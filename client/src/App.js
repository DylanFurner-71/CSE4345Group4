
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTES } from './routes'
import {Provider} from "react-redux";
import {setCurrentUser, logoutUser} from "./actions/authActions";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./components/PrivateRoute"
import Navigation from "./components/navigation"
import Landing from './components/landing'
<<<<<<< HEAD
import Login from './components/login'
import Register from './components/register/register'
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import RegisterStylist from "./components/register/registerStylist";
import StylistProfile from "./components/profile/stylistProfile";
import stylistLanding from "./components/stylist/stylistLanding";

=======
import Login from './components/login/login'
import Register from './components/register/registerUser'
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
<<<<<<< HEAD
import RegisterStylist from "./components/register/registerStylist";
import StylistProfile from "./components/profile/stylistProfile";


=======
import { ROUTES } from './routes'
import registerStylistUser from './components/stylist/registerStylistUser';
import stylistLanding from '/Users/dylanfurner/Desktop/haircutUber/client/src/components/stylist/stylistLanding.js';
>>>>>>> origin
>>>>>>> 530e9268a5ff16542eea1a662f9ce32853e3dda8
// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "/login";
    }
}

function App() {
    return (
        <Provider store={store}>
	        <div className="App">
	            <Navigation/>
	            <Router>
	                <Route exact path="/" component={Landing}/>
	                <Route exact path="/login" component={Login}/>
<<<<<<< HEAD
	                <Route exact path="/user/register" component={Register}/>
                    <Route exact path="/stylist/register" component={RegisterStylist}/>
                    <Route exact path="/stylist/profile" component={StylistProfile}/>
                    <Route exact path="/stylist/landing/" component={stylistLanding}/>
=======
<<<<<<< HEAD
	                <Route exact path="/user/register" component={Register}/>
                    <Route exact path="/stylist/register" component={RegisterStylist}/>
                    <Route exact path="/stylist/profile" component={StylistProfile}/>
=======
	                <Route exact path="/register" component={Register}/>
                    <Route exact path="/stylists/register" component={registerStylistUser}/>
                    <Route exact path="/stylists/stylistLanding" component = {stylistLanding}/>
>>>>>>> origin
>>>>>>> 530e9268a5ff16542eea1a662f9ce32853e3dda8
	                <Switch>
	                    {ROUTES.map((route, i) => <PrivateRoute key={i} {...route}/>)}
	                </Switch>
	            </Router>
	    	</div>
    	</Provider>
    );
}

export default App;
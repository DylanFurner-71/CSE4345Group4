import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider, useDispatch} from "react-redux";
import {setCurrentUser, logoutUser} from "./actions/authActions";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./components/PrivateRoute"
import Navigation from "./components/navigation"
import Landing from './components/landing'
import Login from './components/login/login'
import RegisterUser from './components/register/registerUser'
import RegisterStylist from './components/register/registerStylist'
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { ROUTES } from './routes'
import SendPassword from "./components/sendPassword";
import ChangePassword from "./components/changePassword";



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
                    <Route exact path="/home" component={Landing}/>
	                <Route exact path="/login" component={Login}/>
	                <Route exact path="/user/register" component={RegisterUser}/>
                    <Route exact path="/stylist/register" component={RegisterStylist}/>
<<<<<<< HEAD
                    {/* <Route exact path="/stylist/stylistLanding" component={stylistLanding}/> */}
                    <Route exact path="/stylist/stylistCalendar" component={stylistCalendar}/>
=======
                    <Route exact path="/resetPassword" component={SendPassword}/>
                    <Switch>
                        <Route path="/changePassword/:id" children={<ChangePassword/>}/>
                    </Switch>
>>>>>>> a5e3010b7a2498a558e372825e4c23df8fa698d2
	                <Switch>
	                    {ROUTES.map((route, i) => <PrivateRoute key={i} {...route}/>)}
	                </Switch>
	            </Router>
	    	</div>
    	</Provider>
    );
}

export default App;
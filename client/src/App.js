import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTES } from './routes'
import {Provider} from "react-redux";
import {setCurrentUser, logoutUser} from "./actions/authActions";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./components/privateRoute"
import Navigation from "./components/navigation"
import Landing from './components/landing'
import Login from './components/login'
import Register from './components/register'
import setAuthToken from "./utils/setAuthToken";
import store from "./store";


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
	                <Route exact path="/register" component={Register}/>
	                <Switch>
	                    {ROUTES.map((route, i) => <PrivateRoute key={i} {...route}/>)}
	                </Switch>
	            </Router>
	    	</div>
    	</Provider>
    );
}

export default App;
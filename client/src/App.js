import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ROUTES} from './routes'
import PrivateRoute from "./components/PrivateRoute"
import Navigation from "./components/navigation"
import Landing from './components/landing'
import Login from './components/login'
import Register from './components/register'

function App() {
    return (
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
    );
}

export default App;
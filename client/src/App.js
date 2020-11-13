import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { setCurrentUser, logoutUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/navigation';
import Landing from './components/landing';
import Login from './components/login/login';
import RegisterUser from './components/register/registerUser';
import RegisterStylist from './components/register/registerStylist';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { ROUTES } from './routes';
import SendPassword from './components/sendPassword';
import ChangePassword from './components/changePassword';
import StylistsList from './components/search/stylistsList';
import { Map } from './components/search/map';

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
        window.location.href = '/login';
    }
}

const location = {
    lat: 37.42216,
    lng: -122.08427,
};

const stylist = [
    {
        _id: { $oid: '5f98bd3f1cac294728d679b6' },
        location: {
            type: 'Point',
            coordinates: [-92.3793579591837, 34.7776734693878],
            street: 'New Haven Court',
            city: 'Little Rock',
            state: 'Arkansas',
            zipcode: '72227',
            country: 'US',
        },
        number: '',
        photo: 'https://johnlawrimore.com/smu/101.png',
        services: [],
        role: 'stylist',
        firstName: 'John',
        lastName: 'Furner',
        email: 'dsfurner@smu.edu',
        password:
            '$2a$10$8dKOlnsRjwd04dq4GOAhUeRFD3KSOl54peZ6T/gpL0VsP/gr61zSm',
        businessName: 'Roomamte',
        address: '9 S New Haven Ct.',
        lastLogin: { $date: '2020-10-28T00:37:19.262Z' },
        createdAt: { $date: '2020-10-28T00:37:19.262Z' },
        __v: 0,
    },
    {
        _id: { $oid: '5f98c23e1cac294728d679c1' },
        location: {
            type: 'Point',
            coordinates: [-94.2253216, 36.3172315],
            street: 'Caerleon Circle',
            city: 'Cave Springs',
            state: 'Arkansas',
            zipcode: '72712',
            country: 'US',
        },
        number: '',
        photo: 'https://johnlawrimore.com/smu/101.png',
        services: [],
        role: 'stylist',
        firstName: 'Brandy',
        lastName: 'Furner',
        email: 'dfbrandyurner@smu.edu',
        password:
            '$2a$10$GXrN4.UJwAZzLYrlYEYOFu0Rzek0SS7rJ2PZKKAV3esbgdfs83Zau',
        businessName: 'Roomamte',
        address: '4129 Caerleon Circle',
        lastLogin: { $date: '2020-10-28T00:58:38.439Z' },
        createdAt: { $date: '2020-10-28T00:58:38.439Z' },
        __v: 0,
    },
    {
        _id: { $oid: '5f98b8e31cac294728d679b5' },
        location: {
            type: 'Point',
            coordinates: [-85.1992842613065, 43.3147604221106],
            street: 'Ellsworth Avenue',
            city: 'Stanton',
            state: 'Michigan',
            zipcode: '48888',
            country: 'US',
        },
        number: '',
        photo: 'https://johnlawrimore.com/smu/101.png',
        services: [],
        role: 'stylist',
        firstName: 'Carter ',
        lastName: 'Bischof',
        email: 'cbischof@smu.edu',
        password:
            '$2a$10$Q6z4DOWY7KnYmV9TlbRpEu2bdHyfmzHb5DS0JfBuXDANDosrQscVe',
        businessName: 'Roomamte',
        address: '5647 Ellsworth Avenue',
        lastLogin: { $date: '2020-10-28T00:18:43.203Z' },
        createdAt: { $date: '2020-10-28T00:18:43.203Z' },
        __v: 0,
    },
];

function App() {
    return <Map location={location} stylists={stylist} />;
}

export default App;

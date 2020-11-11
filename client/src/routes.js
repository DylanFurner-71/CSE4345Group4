import UserLanding from './components/userLanding';
import StylistsList from './components/search/stylistsList';
import ChangePassword from './components/changePassword';
import StylistProfile from './components/profile/stylistProfile';
import EditProfile from './components/profile/editProfile';
import SendPassword from './components/sendPassword';
import { Route } from 'react-router-dom';
import React from 'react';
import { ReviewForm } from './components/profile/ReviewForm';

export const ROUTES = [
    { path: '/editProfile', component: EditProfile },
    { path: '/userLanding', component: UserLanding },
    { path: '/stylists/search/:type/:query', component: StylistsList },
    { path: '/changePassword/:id', component: ChangePassword },
    { path: '/stylist/stylistId=:id', component: StylistProfile, exact: true },
    {
        path: '/stylist/stylistId=:id/review',
        component: ReviewForm,
        exact: true,
    },
    { path: '/resetPassword', component: SendPassword },
];

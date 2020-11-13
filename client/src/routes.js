import UserLanding from "./components/userLanding";
import StylistsList from "./components/search/stylistsList";
import ChangePassword from "./components/changePassword";
import StylistProfile from "./components/profile/stylistProfile";
import EditProfile from "./components/profile/editProfile";
import SendPassword from "./components/sendPassword";
import {Route} from "react-router-dom";
import React from "react";
import StylistLanding from "./components/stylistLanding";
import ServicesOffered from "./components/stylist/servicesOffered";
import StylistCalendar from "./components/stylist/stylistCalendar";
export const ROUTES = [
    {path: "/editProfile", component: EditProfile},
    {path: "/userLanding", component: UserLanding},
    {path: "/stylists/search/:type/:query", component: StylistsList},
    {path: "/changePassword/:id", component: ChangePassword},
    {path: "/stylist/stylistId=:id", component: StylistProfile},
    {path: "/resetPassword", component: SendPassword},
    {path: "/stylists/stylistLanding", component: StylistLanding},
    {path: "/services/servicesOffered", component: ServicesOffered},
    {path: "/stylists/stylistCalendar/stylistId=:id", component: StylistCalendar},

]
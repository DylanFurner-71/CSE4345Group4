import UserLanding from "./components/landing/userLanding";
import StylistsList from "./components/search/stylistsList";
import ChangePassword from "./components/changePassword";
import StylistProfile from "./components/profile/stylistProfile";
import EditProfile from "./components/profile/editProfile";
import React from "react";
import UserProfile from "./components/profile/userProfile";

export const ROUTES = [
    {path: "/editProfile", component: EditProfile},
    {path: "/userProfile", component: UserProfile},
    {path: "/userLanding", component: UserLanding},
    {path: "/stylists/search/name=:name?&service=:service?&min=:min?", component: StylistsList},
    {path: "/changePassword/:id", component: ChangePassword},
    {path: "/stylist/stylistId=:id", component: StylistProfile}
]
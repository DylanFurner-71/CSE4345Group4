import UserLanding from "./components/userLanding";
import StylistsList from "./components/search/stylistsList";
import ChangePassword from "./components/changePassword";

export const ROUTES = [
    // {path: '/changePassword', component: SendPassword},
    // {path: "/register", component: Register}
    {path: "/userLanding", component: UserLanding},
    {path: "/stylists/:name", component: StylistsList},
    {path: "/changePassword/:id", component: ChangePassword}
]
import UserLanding from "./components/userLanding";
import StylistsList from "./components/search/stylistsList";
import ChangePassword from "./components/changePassword";
import StylistProfile from "./components/profile/stylistProfile";
import EditProfile from "./components/profile/editProfile";

export const ROUTES = [
    // {path: '/changePassword', component: SendPassword},
    // {path: "/register", component: Register}
    {path: "/editProfile", component: EditProfile},
    {path: "/userLanding", component: UserLanding},
    {path: "/stylists/search/:type/:query", component: StylistsList},
    {path: "/changePassword/:id", component: ChangePassword},
    {path: "/stylist/stylistId=:id", component: StylistProfile}
]
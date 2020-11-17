import UserLanding from "./components/landing/userLanding";
import StylistsList from "./components/search/stylistsList";
import ChangePassword from "./components/changePassword";
import StylistProfile from "./components/profile/stylistProfile";
import EditProfile from "./components/profile/editProfile";
import SendPassword from "./components/sendPassword";
import StylistLanding from "./components/stylistLanding";
import ServicesOffered from "./components/stylist/servicesOffered";
 import StylistCalendar from "./components/stylist/stylistCalendar";
import UserProfile from "./components/profile/userProfile";

export const ROUTES = [
    {path: "/editProfile", component: EditProfile},
    {path: "/userProfile", component: UserProfile},
    {path: "/userLanding", component: UserLanding},
    {path: "/stylists/search/:types/:queries", component: StylistsList},
    {path: "/changePassword/:id", component: ChangePassword},
    {path: "/stylist/stylistId=:id", component: StylistProfile},
    {path: "/resetPassword", component: SendPassword},
    {path: "/stylists/stylistLanding/stylistId=:id", component: StylistLanding},
    {path: "/services/servicesOffered/stylistId=:id", component: ServicesOffered},
    {path: "/stylists/stylistCalendar/stylistId=:id", component: StylistCalendar},

    {path: "/stylist/stylistId=:id", component: StylistProfile}
]
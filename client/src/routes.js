import UserLanding from "./components/userLanding";
import StylistLanding from "./components/stylist/stylistLanding";
import StylistCalendar from "./components/stylist/stylistCalendar"
export const ROUTES = [
    // {path: '/changePassword', component: SendPassword},
    {path: "/stylists/stylistLanding/", component: StylistLanding,},
    {path: "/userLanding", component: UserLanding},
    {path: "/stylist/stylistCalendar", component: StylistCalendar}
]
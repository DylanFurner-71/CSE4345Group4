                   import React, {useEffect, useState} from 'react';
                   import {Link} from 'react-router-dom'
                   import {useParams} from 'react-router-dom'
                   import axios from 'axios'
                   import Loading from "../loading"
                   import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
                   import 'react-tabs/style/react-tabs.css'
                   import {CustomPlaceholder} from "react-placeholder-image";
import moment from "moment";
import DailyCalendar from './dailyCalendar';
                   const StylistCalendar = () => {
                    const [stylist, setStylist] = useState({});
                    const [isLoading, setIsLoading] = useState(true);
                    const stylistId = useParams();
                    const URL = "http://localhost:8000/stylists/";
                    const {firstName} = stylist;
                    const currentDate = moment().format("YYYY-MM-DDThh:mm");
const {appointments} = stylist;
console.log("Sheduler data", currentDate);
let dailyWeeklyMonthly = "daily";
        useEffect(() => {
                        const fetchStylist = async () => {
                            await axios.get(URL+stylistId.id)
                                .then(res => {
                                    const stylistData = res.data.stylist
                                    console.log(stylistData)
                                    setStylist(stylistData)
                                    setIsLoading(false)
                                })
                        }
                        fetchStylist()
                    }, [])
                    const displayCalendar = () => {
                        if (dailyWeeklyMonthly === "daily"){
                            let schedulerData =[{}];
                            if (appointments && appointments.length){
                                schedulerData = appointments.filter(appointment => {
                                return appointment.startTime.contains(currentDate.slice(0,  currentDate.length -15)) || appointment.endTime.contains(currentDate.slice(0,  currentDate.length -15));
                            });
                        }
                        return (
             <DailyCalendar schedulerData={schedulerData} currentDate={currentDate}/>
                        )
                        } else if (dailyWeeklyMonthly === "weekly"){

                        } else if (dailyWeeklyMonthly === "monthly"){

                        }
                    }


                        return (
                            <div className="container-fluid">
                                <Link to={`/stylists/stylistLanding`}>
                             <p> Back To Your Home Page  {stylist.firstName}
                             here is your stylist: {firstName}   </p>                       
                             </Link>
            
      {displayCalendar()}
                            </div>
                        );
                    };
export default StylistCalendar;





/*
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}


*/
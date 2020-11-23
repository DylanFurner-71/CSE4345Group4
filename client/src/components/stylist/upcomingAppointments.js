import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Loading from "../loading"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {CustomPlaceholder} from "react-placeholder-image";
import ReviewBox from "../profile/reviewBox";
import Rating from "../rating/rating";
import { useInput } from '../hooks/InputHook';
import {addService} from "../../actions/stylistActions";
import AppointmentsCard from "./appointmentsCard";
const UpcomingApppointments = () => {
  const [appointments2, setAppointments] = useState([]);
  const stylistId = useParams();
  const currentDate = new Date();
  const { value:name, bind:bindName, reset:resetName } = useInput('');
  const { value:description, bind:bindDescription, reset:resetDescription } = useInput('');
  const { value:price, bind: bindPrice, reset: resetPrice } = useInput('');
  const { value:category, bind: bindCateogry, reset: resetCategory} = useInput('');
useEffect(() => {
  const fetchAppointments = async () => {
      await axios.get(`http://localhost:8000/api/stylists/appointments/${stylistId.id}`)
          .then(res => {
            const appts = res.data.appointments.filter(event => { return Date.parse(event.startDate) >= Date.parse(currentDate)});
            setAppointments(appts)
          })
  }
  
  fetchAppointments()
}, [appointments2])
if (appointments2 && appointments2.length > 0){
let appointments = appointments2;
appointments.filter(event => event.startDate >= currentDate);
console.log("upcoming", appointments)
    return (
        <div className='Services text-center'>
        <h5 className='card-title display-4'> Upcoming Apppointments </h5>
        <AppointmentsCard appointments={appointments} currentDate={currentDate}/>
    </div>
    );
            } else {
                return (
                    <div>
                        There are no upcoming appointments. Please add one Below!
                    </div>
                )
            }
}
export default UpcomingApppointments
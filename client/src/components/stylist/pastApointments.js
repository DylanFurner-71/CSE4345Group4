import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CustomPlaceholder } from 'react-placeholder-image';
import ReviewBox from '../profile/reviewBox';
import Rating from '../rating/rating';
import { useInput } from '../hooks/InputHook';
import { addService } from '../../actions/stylistActions';
import AppointmentsCard from './appointmentsCard';
// filter appointments to see only those where start date is after current date
//we need to measure minutes on this one if yyyy-mm-dd === currentDate
//past Appointments is just the flip side of this
const PastAppointments = () => {
    const [stylist, setStylist] = useState({});
    const stylistId = useParams();
    const currentDate = new Date();
    // const currentDate = new Date(2018, 6, 3, 15, 45);
    const URL = `http://localhost:8000/api`;
    const { value: name, bind: bindName, reset: resetName } = useInput('');
    const {
        value: description,
        bind: bindDescription,
        reset: resetDescription,
    } = useInput('');
    const { value: price, bind: bindPrice, reset: resetPrice } = useInput('');
    const {
        value: category,
        bind: bindCateogry,
        reset: resetCategory,
    } = useInput('');
    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(`${URL}/stylists/${stylistId.id}`).then(res => {
                const stylistData = res.data.stylist;
                setStylist(stylistData);
            });
        };
        fetchStylist();
    }, [stylist]);
    // const appointments =  appointments2.filter(event => event.startDate <= currentDate);
    let appointments;
    if (stylist && stylist.appointments && stylist.appointments.length > 0) {
        appointments = stylist.appointments.filter(
            event => event.startDate <= currentDate
        );
    }

    if (stylist && appointments && appointments.length > 0) {
        console.log(appointments);
        return (
            <div className='Services text-center border border-primary'>
                <h5 className='card-title display-4'> Past Apppointments </h5>
                <AppointmentsCard
                    appointments={appointments}
                    currentDate={currentDate}
                />
            </div>
        );
    } else {
        return (
            <div>There are no upcoming appointments. Please add one Below!</div>
        );
    }
};
export default PastAppointments;

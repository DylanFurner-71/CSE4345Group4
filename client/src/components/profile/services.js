import React, {useEffect, useState} from 'react';
import ServicePopup from "./servicePopup";
import axios from "axios";

const Services = ({ services, stylistId }) => {
    const [modalShow, setModalShow] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const URL = 'http://localhost:8000/stylists/appointments/'
    useEffect(() => {
        const getAppointments = async () => {
            await axios.get(URL+stylistId)
                .then(res => {
                    let returnedAppointments = res.data.appointments
                    returnedAppointments.forEach(appointment => {
                        let startDate = new Date(appointment.startDate)
                        appointment.startDate = startDate.toLocaleString()
                    })
                    const availableAppointments = returnedAppointments.filter(appointment => appointment.user === null)
                    setAppointments(availableAppointments)
                })
                .catch(err => console.log(err))
        }
        getAppointments()
    }, [])

    return (
        <div className='Services text-center'>
            <h5 className='card-title display-4'> Services </h5>
            <div className='card'>
                {services.map((service, i) => (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className='m-3 p-2 border border-dark' key={i}>
                                    <div className="row">
                                        <div className="col-6">
                                            <h3>{service.name}</h3>
                                            <p className="text-muted">{service.description}</p>
                                            <p className="text-muted">${service.price[0]}</p>
                                        </div>

                                        <ServicePopup
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            appointments={appointments}
                                        />
                                        <div className="col-6 align-self-center">
                                            <button onClick={() => {
                                                appointments.length > 0 ? setModalShow(true) :
                                                    alert('No available appointments!')
                                            }} className="btn btn-info">
                                                See available times
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Services;

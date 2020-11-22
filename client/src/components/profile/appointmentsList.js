import React from 'react';

const AppointmentsList = ({appointments}) => {
    return (
        <div>
            {console.log(appointments)}
            <ul className="list-group">
                {appointments.map((appointment, index) =>
                    <li key={index} className="list-group-item m-2">
                        <h2>{appointment.title}</h2>
                        <p>{appointment.startDate} to {appointment.endDate}</p>
                        <p>Location: {appointment.location}</p>

                    </li>
                )}
            </ul>
        </div>
    );
};

export default AppointmentsList;

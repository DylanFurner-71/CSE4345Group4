import React, {useEffect, useState} from 'react';



const AppointmentsCard = (props) => {

    

return (<>
<div>
            <ul className="list-group">
                {props.appointments.map((appointment, index) =>
                    <li key={index} className="list-group-item m-2">
                        <h2>{appointment.title}</h2>
                        <p>Your appointment is with {appointment.userName} </p>
                        <p>{appointment.startDate.toString()} to {appointment.endDate.toLocaleString()}</p>
                        <p>Location: {appointment.location}</p>
                        <p>Current time: {props.currentDate.toLocaleString()}</p>
                    </li>
                )}
            </ul>
        </div>
</>
)

}

export default AppointmentsCard;
import React, {useEffect, useState} from 'react';



const AppointmentsCard = (props) => {

    

return (<>
<div>     {console.log(props.appointments)}
            <ul className="list-group">
                {props.appointments.map((appointment, index) =>
                    <li key={index} className="list-group-item m-2">
                        <h2>{appointment.title}</h2>
                        <p>Your appointment is with </p>
                        <p>{appointment.startDate.toLocaleString()} to {appointment.endDate.toLocaleString()}</p>
                        <p>Location: {appointment.location}</p>

                    </li>
                )}
            </ul>
        </div>
</>
)

}

export default AppointmentsCard;
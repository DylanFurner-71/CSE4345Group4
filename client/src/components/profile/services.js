import React, {useState} from 'react';
import ServicePopup from "./servicePopup";

const Services = ({ services }) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className='Services text-center'>
            <h5 className='card-title display-4'> Services </h5>
            <div className='card'>
                {services.map((service, i) => (
                    <div className='m-3 p-2 border border-dark row justify-content-between' key={i}>

                        <div className='h3'>{service.toUpperCase()}</div>
                        <ServicePopup
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        <button onClick={() => setModalShow(true)} className="btn btn-info">
                            See available times
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;

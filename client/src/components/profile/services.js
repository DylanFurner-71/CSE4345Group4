import React from 'react';

const Services = ({ services }) => {
    return (
        <div className='Services text-center'>
            <h5 class='card-title display-4'> Services </h5>
            <div className='card'>
                {services.map((service, i) => (
                    <div className='m-3' key={i}>
                        <div className='h3'>{service.toUpperCase()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;

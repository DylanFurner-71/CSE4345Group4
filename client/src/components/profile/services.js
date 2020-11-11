import React from 'react';

const Services = ({ services }) => {
    return (
        <div>
            {services.map((service, i) => (
                <div key={i}>{service}</div>
            ))}
        </div>
    );
};

export default Services;

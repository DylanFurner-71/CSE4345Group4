import React from 'react';
import { Link } from 'react-router-dom';

const ServiceBox = ({ imageURL, service }) => {
    const searchURL = `/stylists/search/name=&service=&min=`;
    return (
        <div className='card m-3'>
            <Link to={`${searchURL}`}>
                <img
                    className='card-img-top'
                    src={imageURL}
                    alt='Card image cap'
                />
                <div className='card-body'>
                    <p className='card-text text-center border-dark'>
                        {service}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ServiceBox;

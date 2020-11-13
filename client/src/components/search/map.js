import React, { useState } from 'react';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import './map.css';
import { Link } from 'react-router-dom';

const YOUR_API_KEY = 'AIzaSyCHjOs8sCJfI1C0HnzD5C1BahEx_XRQJvw';

const LocationPin = ({ text }) => (
    <div className='pin'>
        <Icon icon={locationIcon} className='pin-icon' />
        <p className='pin-text'>{text}</p>
    </div>
);

const handleClick = e => {};

export const Map = ({ location, stylists }) => {
    const [center, setCenter] = useState('');
    const [zoom, setZoom] = useState(13);
    return (
        <div className='map'>
            <h2 className='map-h2'>Come Visit Us At Our Campus</h2>

            <div className='google-map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: YOUR_API_KEY }}
                    defaultCenter={center ? center : location}
                    defaultZoom={zoom}
                >
                    {stylists.map(stylist => {
                        return (
                            <Link>
                                <LocationPin
                                    lat={stylist.location.coordinates[1]}
                                    lng={stylist.location.coordinates[0]}
                                    text={stylist.address}
                                    onClick={e => handleClick(stylist)}
                                />
                            </Link>
                        );
                    })}
                </GoogleMapReact>
            </div>
        </div>
    );
};

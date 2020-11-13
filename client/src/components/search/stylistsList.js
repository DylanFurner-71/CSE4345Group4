import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StylistInfo from './stylistInfo';
import Loading from '../loading';
import { Map, LocationPin } from './map';

const StylistsList = () => {
    const query = useParams();
    console.log(query);
    const URL = 'http://localhost:8000/stylists/search';
    const [stylists, setStylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getStylistsOnName = async () => {
        await axios
            .get(URL, {
                params: {
                    name: query.query,
                },
            })
            .then(res => {
                setStylists(res.data.returnedStylists);
                setIsLoading(false);
                console.log('Stylists data fetched');
            })
            .catch(err => console.log(err));
    };

    const getStylistsOnServices = async () => {
        await axios
            .get(URL, {
                params: {
                    services: query.query,
                },
            })
            .then(res => {
                setStylists(res.data.returnedStylists);
                setIsLoading(false);
                console.log('Stylists data fetched');
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (query.type === 'name') {
            getStylistsOnName();
        } else if (query.type === 'services') {
            getStylistsOnServices();
        }
    }, []);

    return (
        <div className='h-100'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='row p-4 m-0'>
                    <ul className='col-8'>
                        {stylists.map((stylist, index) => (
                            <StylistInfo key={index} stylist={stylist} />
                        ))}
                    </ul>
                    <div className='col-4'>
                        {stylists.length > 0 && (
                            <Map
                                stylists={stylists.filter(
                                    stylist => stylist.location
                                )}
                                location={{
                                    lat: stylists.find(s => s.location).location
                                        .coordinates[1],
                                    lng: stylists.find(s => s.location).location
                                        .coordinates[0],
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StylistsList;

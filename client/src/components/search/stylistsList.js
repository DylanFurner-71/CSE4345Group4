import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StylistInfo from './stylistInfo';
import Loading from '../loading';
import SearchFilter from './searchFilter';
import { Map } from './map';

const StylistsList = () => {
    const URL = 'http://localhost:8000/stylists/search';
    const [stylists, setStylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const query = useParams();
    const types = query.types.split('&');
    const queries = query.queries.split('&');
    let params = {};
    types.forEach((key, index) => (params[key] = queries[index]));

    useEffect(() => {
        const getStylists = async () => {
            await axios
                .get(URL, {
                    params: params,
                })
                .then(res => {
                    setStylists(res.data.stylists);
                    setIsLoading(false);
                    console.log('Stylists data fetched');
                })
                .catch(err => console.log(err));
        };
        getStylists();
    }, []);

    return (
        <div className='h-100 align-items-center m-0 overflow-hidden'>
            {isLoading ? (
                <Loading />
            ) : stylists.length === 0 ? (
                <h1 className='text-center align-self-center'>
                    No Stylists Available
                </h1>
            ) : (
                <div className='row'>
                    <div className='col-2'>
                        <SearchFilter
                            types={query.types}
                            queries={query.queries}
                        />
                    </div>

                    <div className='p-0 border-left col-7'>
                        <ul className='p-0 m-0'>
                            {stylists.map((stylist, index) => (
                                <StylistInfo key={index} stylist={stylist} />
                            ))}
                        </ul>
                    </div>

                    <div className='col-3 p-2'>
                        {console.log(stylists.filter(stylist => Object.keys(stylist.location).length !== 0))}
                        {stylists.length > 0 && (
                            <Map
                                stylists={stylists.filter(stylist => Object.keys(stylist.location).length !== 0)}
                                location={{
                                    lat: 32.779167,
                                    lng: -96.808891,
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

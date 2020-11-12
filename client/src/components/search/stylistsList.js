import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import StylistInfo from "./stylistInfo";
import Loading from "../loading";
import SearchFilter from "./searchFilter";

const StylistsList = () => {

    const URL = 'http://localhost:8000/stylists/search'
    const [stylists, setStylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const query = useParams()
    const types = query.types.split("&")
    const queries = query.queries.split("&")
    let params = {}
    types.forEach((key, index) => params[key] = queries[index])

    useEffect(() => {
        const getStylists = async () => {
            await axios.get(URL, {
                params: params
            })
                .then(res => {
                    setStylists(res.data.returnedStylists)
                    setIsLoading(false)
                    console.log('Stylists data fetched')
                })
                .catch(err => console.log(err))

        }
       getStylists()
    }, [])

    return (
        <div className="h-100 align-items-center">
            {
                isLoading ? <Loading/> :
                    stylists.length === 0 ? <h1 className="text-center align-self-center">No Stylists Available</h1> :
                        <div className="row">
                            <div className="col-2">
                                <SearchFilter types={query.types} queries={query.queries}/>
                            </div>

                            <div className="p-0 border-left col-10">
                                <ul className="p-0 m-0">
                                    {stylists.map((stylist, index) => (
                                        <StylistInfo
                                            key={index}
                                            stylist={stylist}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>


            }

        </div>
    );
};

export default StylistsList;

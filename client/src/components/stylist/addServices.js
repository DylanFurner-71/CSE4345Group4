import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import { useInput } from '../hooks/InputHook';
import base_url from '../../base_url';

// Register User
// import { MenuItem } from '../temporaryObjects/restaurantModel';
export const AddServices = () => {
    const [stylist, setStylist] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const stylistId = useParams();
    const URL = `http://${base_url}:8000`;
    const { value: name, bind: bindName, reset: resetName } = useInput('');
    const {
        value: description,
        bind: bindDescription,
        reset: resetDescription,
    } = useInput('');
    const { value: price, bind: bindPrice, reset: resetPrice } = useInput('');
    const {
        value: category,
        bind: bindCateogry,
        reset: resetCategory,
    } = useInput('');

    const onSend = () => {
        const service = {
            name: name,
            description: description,
            price: price,
            category: category,
        };
        const callAxios = async () => {
            await axios
                .post(`/stylists/services/${stylistId.id}/add`, service)
                .then(res => {
                    setStylist(res.data.stylist);
                })
                .catch(err =>
                    //   dispatch({
                    //     type: GET_ERRORS,
                    //     payload: err.response.data
                    // })
                    console.log('Error upon errors')
                );
        };
        resetName();
        resetDescription();
        resetPrice();
        resetCategory();
        //   putAppt(newService);
        callAxios();
    };

    useEffect(() => {
        const fetchStylist = async () => {
            console.log(stylist);
            await axios.get(`${URL}/stylists/${stylistId.id}`).then(res => {
                const stylistData = res.data.stylist;
                console.log(stylistData);
                setStylist(stylistData);
                setIsLoading(false);
            });
        };
        fetchStylist();
    }, [stylist]);
    /*
onChange={event => setNewService(event.target.value)}
*/

    return (
        <>
            <form
                className='container bg-green text-success'
                style={{ width: '50%', height: '50%' }}
            >
                <h3 className='action'>Add Service Offered</h3>
                <div className='form-group'>
                    <label htmlFor='name'>Service Name</label>
                    <input type='text' {...bindName} />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Item Description</label>
                    <input type='text' {...bindDescription} />
                    <div className='form-group'>
                        <label htmlFor='category'>
                            Category (soon will be a list of eli's enumerated
                            services
                        </label>
                        <input type='text' {...bindCateogry} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='ItemPrice'>Price</label>
                        <input type='text' {...bindPrice} />
                    </div>
                    <input
                        className='bg-primary'
                        type='button'
                        value='Submit'
                        onClick={() => onSend()}
                        text='helloworldAddServices'
                    />
                </div>
            </form>
        </>
    );
};

export default AddServices;

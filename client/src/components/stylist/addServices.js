import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import { useInput } from '../hooks/InputHook';

// Register User
// import { MenuItem } from '../temporaryObjects/restaurantModel';
export const AddServices = () => {
    const [stylist, setStylist] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const stylistId = useParams();
    const URL = `http://localhost:8000/api`;
    const { value: name, bind: bindName, reset: resetName } = useInput('');
    const {
        value: description,
        bind: bindDescription,
        reset: resetDescription,
    } = useInput('');
    const { value: price, bind: bindPrice, reset: resetPrice } = useInput(0);
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
                className='container bg-green text-success border border-primary'
                style={{ width: '50%', height: '50%' }}
            >
                <h3 className='action'>
                    Add Service Offered Just a reminder you need to add image
                    support
                </h3>
                <div class='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor='name'>Service Name</label>
                        <input type='text' {...bindName} />
                    </div>
                    <div className='form-group col-md-6'>
                        <label htmlFor='ItemPrice'>Price $:</label>
                        <input type='number' {...bindPrice} />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Item Description</label>
                    <textarea
                        type='text'
                        id='email'
                        name='email'
                        className='form-control'
                        value={description}
                        bind={bindDescription}
                    />
                </div>

                <div class='form-row'>
                    <div className='form-group col'>
                        <label htmlFor='category'>
                            Category (soon will be a list of eli's enumerated
                            services
                        </label>
                        <span>
                            <input type='text' {...bindCateogry} />
                        </span>
                    </div>
                </div>

                <input
                    className='bg-primary'
                    type='button'
                    value='Submit'
                    onClick={() => onSend()}
                    text='helloworldAddServices'
                />
            </form>
        </>
    );
};

export default AddServices;

{
    /* <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form> */
}

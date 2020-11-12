import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Loading from "../loading"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {CustomPlaceholder} from "react-placeholder-image";
import ReviewBox from "../profile/reviewBox";
import Rating from "../rating/rating";
import { useInput } from '../hooks/InputHook';
import {addService} from "../../actions/stylistActions";
// import { MenuItem } from '../temporaryObjects/restaurantModel';
export const AddServices = () => {
  const [stylist, setStylist] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const stylistId = useParams();
  const URL = "http://localhost:8000/stylists/";  
  const { value:name, bind:bindName, reset:resetName } = useInput('');
  const { value:description, bind:bindDescription, reset:resetDescription } = useInput('');
  const { value:price, bind: bindPrice, reset: resetPrice } = useInput('');
  const { value:imgUrl, bind: bindImgUrl, reset: resetImgUrl} = useInput('');
  const { value:category, bind: bindCateogry, reset: resetCategory} = useInput('');
  const onAddClick = () => {
    const service = {
      name: name, description: description, price: price, imgUrl: imgUrl, category:category,
    }
    addService(stylist.id, service);
    resetName();
    resetDescription();
    resetPrice();
    resetImgUrl();
  }    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${name} ${description}`);
        /*
    app.route('stylists/services/:id/add').post(stylist.addService);

        */
    }

    useEffect(() => {
      const fetchStylist = async () => {
          console.log(stylist);
          await axios.get(URL+stylist.id)
              .then(res => {
                  const stylistData = res.data.stylist
                  console.log(stylistData)
                  setStylist(stylistData)
                  setIsLoading(false)
              })
      }
      fetchStylist()
  }, [])


    return(<>
       <form className="container bg-green text-success" style={{width: "50%", height: "50%"}}>
      <h3 class="action">Add Service Offered</h3>
      <div className="form-group">
          <label htmlFor="name">Service Name</label>
          <input type="text" {...bindName} />
      </div>
      <div className="form-group">
          <label htmlFor="description">Item Description</label>
          <input type="text" {...bindDescription} />
      <div className="form-group">
          <label htmlFor="imgURL">Item IMG URL this will change some day to an image upload**</label>
          <input type="text" {...bindImgUrl} />
      </div>
               <div className="form-group">
                <label htmlFor="ItemPrice">Price</label>
                  <input type="text" {...bindPrice} />
                </div>
            <input className="bg-primary" type="button" value="Submit"
               onClick={ () => onAddClick()}                                    />
               </div>
      </form>
      </>)
}
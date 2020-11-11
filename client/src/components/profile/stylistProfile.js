import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import store from "../../store";
import {useParams} from 'react-router-dom'
import axios from 'axios'

const StylistProfile = () => {
    const [stylist, setStylist] = useState({});
    const stylistId = useParams()
    console.log(stylistId)
    const URL = "http://localhost:8000/stylists/"

    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(URL+stylistId.id)
                .then(res => {
                    const stylistData = res.data
                    console.log(res.data)
                    setStylist(res.data)
                })
        }
        fetchStylist()
    }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Edit Profile</h5>
                            <form className="form-signin">
                                <div className="form-label-group">

                                    <label htmlFor="name">Enter New Username</label>
                                </div>

                                <div className="form-label-group">

                                    <label htmlFor="inputEmail">Enter New Email Address</label>
                                </div>

                                <hr/>

                                <Link className="btn btn-secondary mr-2" to="/">Cancel</Link>
                                <button className="btn btn-primary mr-2"
                                        type="submit">Save
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StylistProfile;

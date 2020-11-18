import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import store from "../../store";
import {useSelector} from "react-redux";
import axios from "axios";
import Loading from "../loading";

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const {user} = useSelector(state => state.auth)

    const userId = {user}.user.id
    const token = localStorage.jwtToken
    useEffect(() => {
        const fetchUser = async () => {
            await axios.get("http://localhost:8000/users/me", {
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
                .then(res => {
                    const userData = res.data.user
                    console.log(userData)
                    setIsLoading(false)
                    setEmail(userData.email)
                    setAddress(userData.address)
                    setNumber(userData.number)
                })
                .catch(err => console.log(err))
        }
        fetchUser()
    }, [])


    // Save the profile
    const onSubmit = async event => {
        event.preventDefault()
        await axios.put(`http://localhost:8000/users/${userId}`, {
            email: email,
            address: address,
            number: number
        })
            .then(res => alert('Profile Updated!'))
            .catch(err => console.log(err))

    }


    return (
        <div className="container">
            {isLoading ? <Loading/> :
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Edit Profile</h5>
                                <form className="form-signin" onSubmit={onSubmit}>

                                    <div className="form-label-group">
                                        <input type="email" onChange={event => setEmail(event.target.value)}
                                               className="form-control"
                                               value={email}
                                               id="email"
                                               placeholder="Email address"/>
                                        <label htmlFor="email">Enter New Email Address</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="text" onChange={event => setAddress(event.target.value)}
                                               className="form-control"
                                               value={address}
                                               id="address"
                                               placeholder="Address"/>
                                        <label htmlFor="address">Enter New Address</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="text" onChange={event => setNumber(event.target.value)}
                                               className="form-control"
                                               value={number}
                                               id="number"
                                               placeholder="Phone Number"/>
                                        <label htmlFor="number">Enter New Phone Number</label>
                                    </div>

                                    <hr/>

                                    <Link className="btn btn-secondary mr-2" to="/userLanding">Cancel</Link>
                                    <button className="btn btn-primary mr-2"
                                            type="submit">Save
                                    </button>
                                    <Link to="/resetPassword" className="btn btn-danger">
                                        Change Password
                                    </Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default EditProfile;

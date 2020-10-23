import React, {useState} from 'react';
import {Link} from "react-router-dom";
import store from "../../store";

const StylistProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    let currentState = store.getState()
    console.log(currentState.auth.user)

    // Save the profile
    const onSubmit = () => {

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Edit Profile</h5>
                            <form className="form-signin" onSubmit={onSubmit}>
                                <div className="form-label-group">
                                    <input type="text" onChange={event => setName(event.target.value)}
                                           value={name} className="form-control" id="name" placeholder="Username" required autoFocus />
                                    <label htmlFor="name">Username</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="email" onChange={event => setEmail(event.target.value)}
                                           className="form-control"
                                           value={email}
                                           id="inputEmail"
                                           placeholder="Email address" required />
                                    <label htmlFor="inputEmail">Email address</label>
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

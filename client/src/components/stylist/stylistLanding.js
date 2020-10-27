import React, {Component} from "react";
import {Link} from "react-router-dom";

class stylistLanding extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} className="justify-content-center container valign-wrapper">
                <div className="row">
                    <div className="col center-align">
                        <img style={{ width: "100px", height: "100px"}} src="https://via.placeholder.com/150

C/O https://placeholder.com/" alt="Logo" />
                        <h1>
                            <b>Welcome</b> to the stylist login page
                        </h1>
                        <p className="flow-text grey-text text-darken-1">
                            Review and book stylist made easy (change)
                        </p>
                        <div>
                            <Link
                                to="/stylists/register"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    padding: "12px"
                                }}
                                className="btn btn-large btn-flat waves-effect blue black-text"
                            >Log In</Link>
                            <Link
                                to="/"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    padding: "12px"
                                }}
                                className="btn btn-large btn-flat waves-effect blue black-text"
                            >Back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default stylistLanding;

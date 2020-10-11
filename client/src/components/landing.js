import React, {Component} from "react";
import {Link} from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} className="justify-content-center container valign-wrapper">
                <div className="row">
                    <div className="col center-align">
                        <img style={{ width: "100px", height: "100px"}} src="https://via.placeholder.com/150

C/O https://placeholder.com/" alt="Logo" />
                        <h1>
                            <b>Welcome</b> to Haircut Uber (change)
                        </h1>
                        <p className="flow-text grey-text text-darken-1">
                            Review and book stylist made easy (change)
                        </p>
                        <div>
                            <Link
                                to="/login"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    padding: "12px"
                                }}
                                className="btn btn-large btn-flat waves-effect blue black-text"
                            >Log In</Link>
                            <Link
                                to="/register"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    padding: "12px"
                                }}
                                className="btn btn-large btn-flat waves-effect blue black-text"
                            >Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;

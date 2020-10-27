import React, {Component} from "react";
import {Link} from "react-router-dom";
import StylistNav from './stylistNav';
import {stylistCalendar} from './stylistCalendar';
class stylistLanding extends Component {
    constructor() {
        super();
        this.state = {
            stylistName: "",
            stylistId: "",
            reviews: [],
            calendar: [],
            error: ""
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
    };
    render() {
        return (

            <div className="justify-content-center container valign-wrapper">
            {StylistNav()}
                <div className="row">
                    <div className="col center-align">
                        <h1> Hello ${"Someday this will be a stylist name"}
                        </h1>
                        <div className = "stylistNav">
                        {new stylistCalendar()}
                        </div>
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

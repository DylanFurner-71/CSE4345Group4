import React, {Component} from "react";
import {Link} from "react-router-dom";
import StylistNav from './stylistNav';
import {stylistCalendar} from './stylistCalendar';
import { getCurrentUser } from "../../actions/authActions";
import {connect} from "react-redux";

class stylistLanding extends Component {
    constructor() {
        super();
        this.state = {
            stylistName: "",
            stylistId: "",
            firstName: "",
            lastName: "",
            reviews: [], //going to use gui homeowrk three to model this
            calendar: [], //i guess its empty
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
                        <h1> Hello {`${this.state.stylistName}`}
                        </h1>
                        <div className = "stylistNav">
                        <stylistCalendar/>
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

const mapDispatchToProps = dispatch => {
    return {
        stylistCurr: () => dispatch(getCurrentUser())
    }
  }


export default connect(
    mapDispatchToProps,
)(stylistLanding);

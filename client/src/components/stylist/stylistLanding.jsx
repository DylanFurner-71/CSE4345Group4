import React, {Component} from "react";
import {Link} from "react-router-dom";
import StylistNav from './stylistNav';
import {stylistCalendar} from './stylistCalendar';
import {connect} from "react-redux";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {stylistProfileCard} from "./stylistProfileCard";
import { getStylistByID } from "../../actions/stylistActions";
import {logoutUser, getCurrentUser, setCurrentUser} from "../../actions/authActions";
import { useEffect, useState } from 'react';
import { createStore } from 'redux';
import store from "../../store";
// const dispatch = useDispatch()
// const onLogout = () => {
//     dispatch(logoutUser())
// }
const stylistLandingInfo = () => {
    const {user} = store.getState();
    return user.id;
}
export class stylistLanding extends Component {
    constructor() {
        super();
        this.state = {
          stylist: [],
          id: stylistLandingInfo,
        };
    }

    componentDidMount(props) {
        const queryString = window.location.search;
        const id2 = this.state.id;
        console.log("We are in query string", id2);
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        const t = getStylistByID(id)
        .then(stylist => this.setState({stylist}));
    }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
        console.log("Stylist landing component will receive props");
      this.props.history.push(`/stylists/stylistLanding/`); // push user to dashboard when they login
    const stylist2 = getStylistByID(nextProps.auth);
    console.log(stylist2);
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
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
            {StylistNav(this.state.stylistName, this.state.stylistId)}
            <h1> Hello {`${this.state.stylistName}`} welcome to Ultimate Style!
                        </h1>
                            <stylistProfileCard photo={this.state.photo}/>
                            <img src={this.state.photo}/>

                        <div>
                <div className="row">
                    <div className="col center-align">
                       
                            <Link
                                to={`/stylist/stylistCalendar`}
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    padding: "12px"
                                }}
                                className="btn btn-large btn-flat waves-effect blue black-text"
                            >Calendar</Link>
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

const mapDispatchToProps = state => {
// this.props.stylist = store.dispatch()
const stylist = setCurrentUser();
return {
    stylist: stylist,
  }
}

export default connect(
    mapDispatchToProps,
)(stylistLanding);

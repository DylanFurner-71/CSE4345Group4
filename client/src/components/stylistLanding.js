import React, {Component} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {Link} from 'react-router-dom'
import  * as StylistCalendar from "./stylist/stylistCalendar";
import AddServices from "./stylist/addServices";
const appointmentsOrAdd = ({stylist}) => {
    if (stylist.appointments === undefined){
            return (
                <div>
            You have no appointments and we will make functionality soon undefined option</div>);
    }
    if (stylist.services === undefined) {
        return (<div>
            You need to add services that you offer before you are able to have customers book appointments with
        <AddServices stylist={stylist}/>
        </div>
        );
       } 
    if ((stylist.appointments != undefined)){
        return (<StylistCalendar/>);
    }
}
const StylistLanding = () => {
    const {user} = useSelector(state => state.auth);
    return (
        <div className="container justify-content-center align-items-center h-100" style={{marginTop: "3%"}}>
            <div className="row">
                {/* <div className="col-6 mx-auto  align-self-center text-center">
                    <h1><b>Hello</b>, {user.firstName}</h1>
                </div> */}
<div className="justify-content-center container valign-wrapper">
<h1> Hello {`${user.firstName}  ${user.lastName}`} welcome to Ultimate Style!
            </h1>
                <img src={user.photo}/>
                <div className="container">

                </div>
              {appointmentsOrAdd({stylist: user})}
            <div>
            {/* <Container fluid="sm">
                        <Row>
                        <Col><LoginCard accountType={userTypes.Customer}/></Col>
                        <Col><Services accountType={userTypes.RestaurantEmployee}/></Col>
                        </Row>
                        <Row>
                        <Col><LoginCard accountType={userTypes.Delivery}/></Col>
                        <Col><LoginCard accountType={userTypes.WebManager}/></Col>
                        </Row>
            </Container> */}









                
    <div className="row">
        <div className="col center-align">
                <Link
                    to={`/stylists/stylistCalendar/stylistId=${user.id}`}
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
            </div>

        </div>
    );
};

export default StylistLanding;


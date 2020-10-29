import React from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import {StylistCalendar} from "./stylistCalendar";
const StylistNav = (props) => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/home">{props.stylistName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/appointments/upcoming">Upcoming Appointments</Nav.Link>
                        <Nav.Link href="/appointments/past">Past Appointments</Nav.Link>
                        <Nav.Link href="/services/stylistIDsomeday">Services Offered</Nav.Link>
                        <Nav.Link href="/stylist/stylistCalendar">Calendar </Nav.Link>
                        <Nav.Link href="/home">TBD</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default StylistNav;
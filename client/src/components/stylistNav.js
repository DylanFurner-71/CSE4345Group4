import React from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

const StylistNav = (props) => {
    const {user} = useSelector(state => state.auth);
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/home">{props}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={`/stylists/appointments/upcoming/stylistId=${user.id}`}>Upcoming Appointments</Nav.Link>
                        <Nav.Link href={`/stylists/appointments/past/stylistId=${user.id}`}>Past Appointments</Nav.Link>
                        <Nav.Link href={`/services/servicesOffered/stylistId=${user.id}`}>Services Offered</Nav.Link>
                        <Nav.Link href={`/stylists/stylistCalendar/${user.id}`}>Calendar </Nav.Link>
                        <Nav.Link href="/home">TBD</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default StylistNav;
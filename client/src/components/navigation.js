import React, {useState} from 'react';
import {Button, Navbar, Nav, NavDropdown, Form, FormControl} from "react-bootstrap"
import {useDispatch, useSelector, useStore} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {Link} from "react-router-dom";

const Navigation = () => {
    const [name, setName] = useState('');
    const searchURL = '/stylists/search/'
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logoutUser())
    }
    if (user.role === "stylist"){
        return (       
             <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href={`/stylistLanding/stylistId=${user.id}`}></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={`/stylists/appointments/upcoming/stylistId=${user.id}`}>Upcoming Appointments</Nav.Link>
                        <Nav.Link href={`/stylists/appointments/past/stylistId=${user.id}`}>Past Appointments</Nav.Link>
                        <Nav.Link href={`/services/servicesOffered/stylistId=${user.id}`}>Services Offered</Nav.Link>
                        <Nav.Link href={`/stylists/stylistCalendar/${user.id}`}>Calendar </Nav.Link>
                        <Nav.Link href={`/stylistLanding/stylistId=${user.id}`}>TBD</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        );
    } else {
    return (
        <div>
            {/*make nav bar bigger brigher*/}
            <Navbar bg="light" variant="light" expand="lg" className="border-bottom">
                <Navbar.Brand href="/userLanding">Ultimate Style</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
                            <NavDropdown.Item href={searchURL+'name=&service=haircuts&min='}>Haircuts</NavDropdown.Item>
                            <NavDropdown.Item href={searchURL+'name=&service=waxing&min='}>Waxing</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/userProfile">My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <FormControl
                        onChange={event => setName(event.target.value)}
                        value={name}
                        type="text"
                        placeholder="Stylist"
                        className="mr-sm-2"
                    />
                </Form>
                <a href={`${searchURL}name=${name}&service=&min=`}><Button variant="dark">Search</Button></a>
                {user.isAuthenticated ? <button onClick={onLogout} className="btn btn-warning mx-2">Logout</button> : <></>}

            </Navbar>

        </div>
    );
    }
}

export default Navigation;
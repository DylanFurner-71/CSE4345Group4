import React, {useState} from "react";
import {Link} from "react-router-dom";
import RegisterPopup from "./register/registerPopup";

const Landing = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div style={{ height: "75vh" }} className="container">
            <div className="d-flex justify-content-center flex-column">
                <img className="mx-auto" style={{ width: "100px", height: "100px"}} src={require("../UltimateStyle.png" )}/>
                <h1 className="mx-auto">
                    <b>Welcome</b> to Ultimate Style
                </h1>
                <p className="mx-auto text-secondary">
                    Review and book stylist made easy
                </p>
                <div className="mx-auto d-flex justify-content-center">
                    <Link
                        to="/login"
                        className="btn btn-primary m-2"
                    >Log In</Link>
                    {/*<Link*/}
                    {/*    to="/register"*/}
                    {/*    style={{*/}
                    {/*        width: "140px",*/}
                    {/*        borderRadius: "3px",*/}
                    {/*        letterSpacing: "1.5px",*/}
                    {/*        */}
                    {/*    }}*/}
                    {/*    className="btn btn-large btn-flat waves-effect blue black-text m-2"*/}
                    {/*>Register</Link>*/}
                    <button onClick={() => setModalShow(true)} className="btn btn-primary m-2">
                        Register
                    </button>
                    <RegisterPopup
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </div>
    );


}

export default Landing;

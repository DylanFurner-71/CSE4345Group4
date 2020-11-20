import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

const ServicePopup = props => {
    const [times, setTimes] = useState({
        'M': [],
        'Tu': [],
        'W': [],
        'Th': [],
        'F': [],
        'SAT': [],
        'Sun': []
    });

    return (
        <div>
            <Modal
                {...props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Available Times
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-auto">

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ServicePopup;

import React from 'react';
import Rating from "../rating/rating";
import {CustomPlaceholder} from "react-placeholder-image";
import {Link} from "react-router-dom";

// Information span for each stylist
const StylistInfo = ({stylist}) => {
    console.log(stylist)
    return (
        <div className="container-fluid w-75 my-2">
            <Link to={`/stylist/stylistId=${stylist._id}`}>
                <hr/>
                <div className="row">
                    <div className="col-3 p-0">
                        {
                            stylist.photo === 'no-photo.jpg' ?
                                <CustomPlaceholder
                                    width="200"
                                    height="200"
                                    backgroundColor="#123456"
                                    textColor="#ffffff"
                                    text={`Stylist ${stylist.firstName}`}
                                /> :
                                <img src={stylist.photo} className="stylistImage" alt="Stylist"/>
                        }

                    </div>
                    <div className="col-6">
                        <h4>{stylist.firstName} {stylist.lastName}</h4>
                        <h5><span className="badge badge-primary">{stylist.businessName}</span></h5>
                    </div>
                    <div className="col-3">
                        <Rating rating={stylist.average}/>
                        <p className="text-muted d-inline ml-1">({stylist.reviews.length})</p>
                    </div>
                </div>
                <hr/>
            </Link>

        </div>
    );
};

export default StylistInfo;

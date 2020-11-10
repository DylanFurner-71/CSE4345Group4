import React from 'react';
import Rating from "../rating/rating";

// Information span for each stylist
const StylistInfo = ({stylist}) => {
    return (
        <div className="container-fluid w-75 my-2">
            <hr/>
            <div className="row">
                <div className="col-3 p-0">
                    <img src={stylist.photo} className="productImage" alt="Product"/>
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
        </div>
    );
};

export default StylistInfo;

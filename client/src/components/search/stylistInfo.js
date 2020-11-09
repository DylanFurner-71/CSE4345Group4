import React from 'react';

// Information span for each stylist
const StylistInfo = ({stylist}) => {


    return (
        <div className="container-fluid w-75">
            {console.log(stylist)}
            <div className="row">
                <div className="col-3 p-0">
                    <img src={stylist.photo} className="productImage" alt="Product"/>
                </div>
                <div className="col-7">
                    <h4>{stylist.firstName} {stylist.lastName}</h4>
                    <h5><span className="badge badge-primary">{stylist.businessName}</span></h5>
                </div>
                <div className="col-2">
                    <p>Reviews</p>
                </div>
            </div>
        </div>
    );
};

export default StylistInfo;

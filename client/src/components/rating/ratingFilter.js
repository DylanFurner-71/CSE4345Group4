import React from 'react';
import Rating from "./rating";
import {Link} from "react-router-dom";

const RatingFilter = ({types, queries}) => {
    const ratings = [5,4,3,2,1]
    const searchURL = "/stylists/search"
    return (
        <div>
            <ul style={{listStyleType: "none"}}>
                {ratings.map((rating, index) => (
                    <li key={index}>
                        <Link to={`${searchURL}/${types}&min/${queries}&${rating}`} style={{textDecoration: 'none'}}>
                            <Rating rating={rating} /> & Up
                        </Link>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RatingFilter;

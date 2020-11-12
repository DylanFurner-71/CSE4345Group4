import React from 'react';
import RatingFilter from "../rating/ratingFilter";

const SearchFilter = ({types, queries}) => {
    return (
        <div>
            <hr/>
            <div>
                <h6 className="text-center">Avg. Customer Review</h6>
                <RatingFilter types={types} queries={queries}/>
            </div>
        </div>
    );
};

export default SearchFilter;

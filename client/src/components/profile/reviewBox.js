import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from '../rating/rating';

const ReviewBox = props => {
    return (
        <div className='ReviewBox p-1'>
            <div className='ReviewBox-Average text-center m-2 card'>
                <h3 className='display-4'>{props.stylist}'s Average Rating:</h3>
                <h3>
                    <Rating rating={props.average} />
                </h3>
            </div>
            <div className='ReviewBox-Reviews'>
                <header className='display-3 text-center'>Reviews</header>
                {props.reviews.map(review => (
                    <div className='Review-Card card my-2 p-2'>
                        <h6 className='display-4 m-1' key={review._id}>
                            {review.reviewerName}{' '}
                        </h6>
                        <h1>
                            <Rating rating={review.score} />
                        </h1>
                        <p>{review.notes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewBox;

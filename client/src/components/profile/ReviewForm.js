import { format } from 'path';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';

export const ReviewForm = props => {
    // this didn't work on my end...
    const { user } = useSelector(state => state.auth);
    const [rating, setRating] = useState(0);
    const [reviewNote, setReviewNote] = useState('');
    const stylistId = useParams();

    const submitForm = async e => {
        let stylist = props.location.stylist;
        if (rating === 0) {
            alert('Must add a rating');
        } else {
            if (!stylist) {
                console.log('here', stylistId);
                await axios
                    .get('http://localhost:8000/stylists/' + stylistId.id)
                    .then(res => {
                        stylist = res.data.stylist;
                    });
                console.log(stylist);
            }

            // email should be passed down from props...
            const review = {
                email: stylist.email,
                reviewerName: `${user.firstName} ${user.lastName}`,
                score: rating,
                notes: reviewNote,
            };
            axios.post('http://localhost:8000/stylists/postreview', review);
            props.history.push(`/stylist/stylistId=${stylistId.id}`);
        }
    };

    return (
        <form className='ReviewForm'>
            <div className='form-group d-flex flex-column justify-content-center align-items-center'>
                <h2 className='display-3 mb-5 text-center'>
                    Review this Stylist
                </h2>
                <div className='ReviewForm-Stars py-3 w-100 text-center border-top border-bottom'>
                    <h4>Rating</h4>
                    <span className={'stars-lg'}>
                        {[1, 2, 3, 4, 5].map(x => (
                            <i
                                key={x}
                                className={
                                    x > rating ? 'empty-star' : 'full-star'
                                }
                                onClick={e => {
                                    console.log(x);
                                    setRating(x);
                                }}
                            />
                        ))}
                    </span>
                </div>
            </div>
            <div
                className='form-group text-center my-3'
                style={{ height: '30vh' }}
            >
                <h3>Say a little about your experience</h3>
                <textarea
                    onChange={e => setReviewNote(e.target.value)}
                    value={reviewNote}
                    className='form-control w-75 mx-auto h-75'
                ></textarea>
            </div>

            <button
                onClick={submitForm}
                type='button'
                className='btn btn-primary d-block mx-auto'
            >
                {' '}
                Add Review{' '}
            </button>
        </form>
    );
};

import React, {useEffect, useState} from 'react';
import axios from 'axios'

const ReviewBox = ({stylistId}) => {
    const URL = "http://localhost:8000/stylists/"
    //setState
    const [reviews, setReviews] = useState([]);
    //componentDidMount (first time)
    //componentDidUpdate (every time it updates)
    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(URL+stylistId)
                .then(res => {
                    const data = res.data
                    const reviews = data.reviews
                    setReviews(reviews)
                })
        }
    }, [])

    return (
        <div>

        </div>
    );
};

export default ReviewBox;

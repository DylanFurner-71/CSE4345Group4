import React from 'react';
import {useSelector} from "react-redux";

const UserLanding = props => {
    const user = useSelector(state => state.auth)
    const logout = () => ({type: ''})
    return (
        <div>
            The user is {user}
        </div>
    );
};

export default UserLanding;

import React, {useState} from 'react';
import {Redirect} from "react-router-dom";

const SearchBar = () => {
    // Stylist name searched
    const [name, setName] = useState('');

    const onSearch = event => {
        event.preventDefault()
    }

    return (
        <div className="input-group mb-3">
            <input type="text"
                   className="form-control"
                   placeholder="Stylist"
                   aria-label="Stylist"
                   aria-describedby="basic-addon2"
                   value={name}
                   onChange={event => setName(event.target.value)}
            />
            <div className="input-group-append">
                <Redirect />
                <button className="btn btn-outline-secondary" type="button" onClick={onSearch}>Search</button>
            </div>
        </div>
    );
};

export default SearchBar;

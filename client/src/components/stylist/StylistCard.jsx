import React, { Component } from "react";

import {Link} from "react-router-dom";
export const StylistCard = props =>
    <>
    <div className="p-3 mb-2 bg-primary text-white">
                <div className="d-flex flex-column">
                    <div className="p-2">{props.accountType}</div>
                    <div className="p-2">
                        <div className="d-flex flex-row text-white">
                            <div className="p-2 mb-2  pb-10% pt-10%">
                                <Link
                                    to={props.url}
                               style={{justifyContent: "center"}}
                                    className="btn btn-large btn-flat waves-effect white black-text"
                                >{props.info}</Link>
                            </div>

</div>
</div>
</div>
</div>
    </>

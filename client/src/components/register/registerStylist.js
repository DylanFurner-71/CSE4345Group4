import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUserStylist } from "../../actions/authActions";
import classnames from "classnames";
import "./register.css"

class RegisterStylist extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            texasID: "",
            email: "",
            password: "",
            password2: "",
            error: "",
            businessName: "",
            photo: "",
            address: "",
        };
    }
    
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUserStylist = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            texasID: this.state.texasID,
            businessName: this.state.businessName,
            photo: this.state.photo,
            address: this.state.address,
        };
        this.props.registerUserStylist(newUserStylist, this.props.history);
    };
    render() {
        const { error } = this.state;
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> a stylist account below
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    error={error.firstName}
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    className={classnames("", {
                                        invalid: error.firstName
                                    })}
                                />
                                <label htmlFor="firstName">First Name</label>
                                <span className="red-text">{error.firstName}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                    error={error.lastName}
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className={classnames("", {
                                        invalid: error.lastName
                                    })}
                                />
                                <label htmlFor="lastName">Last Name</label>
                                <span className="red-text">{error.lastName}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={error.email}
                                    id="email"
                                    type="email"
                                    placeholder="something something @email.com"
                                    className={classnames("", {
                                        invalid: error.email
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{error.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={error.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: error.password
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{error.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={error.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: error.password2
                                    })}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{error.password2}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.texasID}
                                    error={error.texasID}
                                    id="texasID"
                                    type="text"
                                    placeholder="Enter any texas barber's licence or cosmetology license, we'll check to make sure its valid soon"
                                    className={classnames("", {
                                        invalid: error.texasID
                                    })}
                                />
                                <label htmlFor="texasID">Texas Cosmetology License ID Number</label>
                                <span className="red-text">{error.texasID}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.businessName}
                                    error={error.businessName}
                                    id="businessName"
                                    type="text"
                                    placeholder="Enter the business name on your license"
                                    className={classnames("", {
                                        invalid: error.businessName
                                    })}
                                />
                                <label htmlFor="businessName">Business Name</label>
                                <span className="red-text">{error.businessName}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.photo}
                                    error={error.photo}
                                    id="photo"
                                    type="text"
                                    placeholder="Enter the url of your photo :/"
                                    className={classnames("", {
                                        invalid: error.photo
                                    })}
                                />
                                <label htmlFor="photo">Photo</label>
                                <span className="red-text">{error.photo}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    error={error.address}
                                    id="address"
                                    type="text"
                                    placeholder="Enter your address or business address"
                                    className={classnames("", {
                                        invalid: error.address
                                    })}
                                />
                                <label htmlFor="address">Adress</label>
                                <span className="red-text">{error.address}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="button"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    onClick={this.onSubmit}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
RegisterStylist.propTypes = {
    registerUserStylist: PropTypes.func.isRequired,
    auth: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps,
    { registerUserStylist }
)(withRouter(RegisterStylist));
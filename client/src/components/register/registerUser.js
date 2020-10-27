import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./register.css"

class RegisterUser extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            error: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to RegisterUser page, should redirect them to dashboard
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { error } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <div className="form-label-group">
                                        <input type="text" onChange={this.onChange} error={error.name}
                                               value={this.state.name} id="name" className={classnames("form-control", {
                                            invalid: error.name
                                        })} placeholder="Username" required autoFocus />
                                            <label htmlFor="name">Username</label>
                                            <span className="red-text">{error.name}</span>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="email" onChange={this.onChange}
                                               value={this.state.email}
                                               error={error.email} id="inputEmail"
                                               placeholder="Email address" className={classnames("form-control", {
                                            invalid: error.email
                                        })} required />
                                            <label htmlFor="inputEmail">Email address</label>
                                            <span className="red-text">{error.email}</span>
                                    </div>

                                    <hr/>

                                        <div className="form-label-group">
                                            <input type="password" onChange={this.onChange}
                                                   value={this.state.password}
                                                   error={error.password} id="inputPassword"
                                                   placeholder="Password" className={classnames("form-control", {
                                                invalid: error.password
                                            })} required />
                                                <label htmlFor="inputPassword">Password</label>
                                                <span className="red-text">{error.password}</span>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" onChange={this.onChange}
                                                   value={this.state.password2}
                                                   error={error.password2} id="inputConfirmPassword" placeholder="Password"
                                                   className={classnames("form-control", {
                                                       invalid: error.password2
                                                   })} required />
                                                <label htmlFor="inputConfirmPassword">Confirm password</label>
                                                <span className="red-text">{error.password2}</span>
                                        </div>

                                        <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                                type="submit">Register
                                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
RegisterUser.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(RegisterUser));
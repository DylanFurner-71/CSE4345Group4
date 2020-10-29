import React, {Component} from "react";
import {Link} from "react-router-dom";
import StylistNav from './stylistNav';
import {stylistCalendar} from './stylistCalendar';
import { getCurrentUser } from "../../actions/authActions";
import {connect} from "react-redux";
import moment from "moment";
import {stylistProfileCard} from "./stylistProfileCard";
export class stylistLanding extends Component {
    constructor() {
        super();
        this.state = {
            stylistName: "Dylan Furner",
            stylistId: "dfurner@smu.edu",
            firstName: "Dylan",
            lastName: "Furner",
            email: "dfurner@smu.edu",
            photo: "https://johnlawrimore.com/smu/101.png",
            reviews: [], //going to use gui homeowrk three to model this
            events: [
                {
                  stylistID: this.email,
                  start: moment().toDate(),
                  end: moment().add(1, "days").toDate(),
                  title: "Some title",
                },
              ],
            error: ""
        };
    }
    componentDidMount() {
        
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
    };
    render() {
        return (

            <div className="justify-content-center container valign-wrapper">
            {StylistNav(this.state.stylistName, this.state.stylistId)}
            <h1> Hello {`${this.state.stylistName}`} welcome to Ultimate Style!
                        </h1>
                            <stylistProfileCard photo={this.state.photo}/>
                            <img src={this.state.photo}/>

                        <div>
                <div className="row">
                    <div className="col center-align">
                       
                            <Link
                                to={`/stylist/stylistCalendar`}
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    padding: "12px"
                                }}
                                className="btn btn-large btn-flat waves-effect blue black-text"
                            >Calendar</Link>
                            <Link
                                to="/"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    padding: "12px"
                                }}
                                className="btn btn-large btn-flat waves-effect blue black-text"
                            >Back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        stylistCurr: () => dispatch(getCurrentUser())
    }
  }


export default connect(
    mapDispatchToProps,
)(stylistLanding);

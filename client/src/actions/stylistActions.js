import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    CURRENT_USER,
} from "./types";
// Register User
const api = "http://localhost:8000";
axios.defaults.baseURL = api;
export const getStylistByID = async (id) => {
       try {
           axios
        .get(`/stylists/${id}`).then(function(result)  {
            // console.log(data.data);
            // currStylist = data.data;
            return result;
            
           }) //re-direct to login on successful register
        .catch(err =>
            // dispatch({
            //     type: GET_ERRORS,
            //     payload: err.response
            // })
            console.log(err)
        );
       } catch {
           console.log("we are right here");
       }
};


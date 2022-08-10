/*
|--------------------------------------------------------------------------
| Auth actions.
|--------------------------------------------------------------------------
|
| Here all api calls and business logic concerned with authentication are
| handled. This (potentially among others) includes registration, login,
| logout.
|
*/

import axios from "axios";
import { request } from "http";
import * as types from "../actionTypes";
import Cookies from 'js-cookie';



/**
 * Load currently logged in user from DB.
 *
 * This usually happens after a successful login
 * or after a page refresh when there is currently
 * an active user.
 */

export const TOKEN_STORAGE_KEY = 'token';
 export const USERINFO  = "user";               

export const loadUser = (username) => {
    
    return async (dispatch: CallableFunction) => {
        try {

            //await axios.get("/sanctum/csrf-cookie");
            //const token = Cookies.get(TOKEN_STORAGE_KEY);
            //axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
            const res = await axios.post("/users", {username});
            if (res.status === 200) {
                Cookies.set(USERINFO, res.data.data.username);
                
                // dispatch({ type: types.USER_LOADED, payload: res.data });
                return res.data;
            }
        } catch (error) {

            if (error.response.status === 401) {
                return dispatch({
                    type: types.USER_LOADED_ERROR,
                    payload: "Email or password are incorrect.",
                });
            }
            if (error.response.status === 401) {
                return dispatch({
                    type: types.AUTHENTICATION_ERROR,
                    payload: {
                        errorMsg: "Keinen Serverzugang.",
                    },
                });
            } else {
                return dispatch({
                    type: types.USER_LOADED_ERROR,
                    payload: "Sorry, something went wrong.",
                });
            }
        }
    };
};

/**
 * Login functionality.
 *
 * @param {string} email
 *   The email address of the user.
 * @param {string} password
 *   The password of the user.
 */
export const login = (username: string, uid: string): any => {
           console.log("explore url : ",username, uid)
    return async (dispatch: CallableFunction) => {
        try {
            // Start loading.
            dispatch({ type: types.START_LOGIN_LOADING });

            // Make api requests.
            // await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/user_auth", {
                username,
                uid,
            });

            //Authentication was successful.
            if (res.status === 200) {
                Cookies.set(TOKEN_STORAGE_KEY, res.data.token);
                console.log("token err",res.data.token)

                dispatch(loadUser(res.data.token));
                dispatch({
                    type: types.LOGIN_SUCCESS,
                });
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "Email or password are incorrect.",
                });
            }
            if (error.response && error.response.status === 419) {
                return dispatch({
                    type: types.LOGIN_ERROR,
                    payload: "Application access denied.",
                });
            } else {
                return dispatch({
                    type: types.AUTHENTICATION_ERROR,
                    payload: "Sorry, somethig went wrong.",
                });
            }
        }
    };
};

/**
 * Registration functionality.
 *
 * @param {string} name
 *   The name of the user.
 * @param {string} email
 *   The email of the user.
 * @param {string} password
 *   The password of the user.
 * @param {string} password_confirmed
 *   The confirmed password of the user.
 */
export const register = (
    name: string,
    email: string,
    username: string,
    career: string,
    genre: string,
    country: string,
    password: string,
    password_confirmed: string
) => {

    return async (dispatch: CallableFunction) => {
        try {
            dispatch({
                type: types.START_REGISTER_LOADING,
            });
            // API Call.
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/register", {
                name,
                email,
                username,
                career,
                genre,
                country,
                password,
                password_confirmed,
            });

            // Load the user if registration was successful.
            if (res.status === 200) {
                Cookies.set(TOKEN_STORAGE_KEY, res.data.token);
                dispatch(loadUser(res.data.token));
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                const emailErrorMsg = error.response.data.errors.email[0];

                if (emailErrorMsg) {
                    dispatch({
                        type: types.REGISTER_ERROR,
                        payload: emailErrorMsg,
                    });
                }
            } else {
                dispatch({
                    type: types.REGISTER_ERROR,
                    payload: "Sorry, something went wrong.",
                });
            }
        }
    };
};

/**
 * Log current user out.
 */
export const logout = () => {
    return async (dispatch: CallableFunction) => {
        try {
            const res = await axios.get("/logout");
            if (res.status === 204) {
                dispatch({
                    type: types.LOGOUT,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/**
 * Request a password reset link for an account by a given email address.
 *
 * If the request is successfull, the user will get a link by email where
 * he can create a new password.
 *
 * @param {string} email
 *   The email for the account whose password will be reset.
 *
 * @return {object}
 *   Error and success message.
 */
export const forgotPassword = (email: string) => {
    return async (dispatch: CallableFunction) => {
        try {
            const res = await axios.post("/password/email", { email });

            // Behaviour on success.
            if (res.status === 200) {
                return {
                    success: res.data.message,
                    error: "",
                };
            }
        } catch (error) {
            // Return an error message if the email was not found in the DB.
            if (error.response.status === 422) {
                dispatch({
                    type: types.AUTH_GENERAL_ERROR,
                });
                return {
                    success: "",
                    error: "Seems like there is no account for that email.",
                };
            }
        }
    };
};

/**
 * Create a new password for a given user.
 *
 * @param {string} email
 *   The email address of the user.
 * @param {string} password
 *   The new password.
 * @param {string} token
 *   The token. It must have been created beforehand by declaring a forgotten password (see forgotPassword()).
 *
 * @return {object}
 */
export const resetPassword = (email, password, token) => {
    return async (dispatch: CallableFunction) => {
        try {
            const res = await axios.post("/password/reset", {
                email,
                password,
                token,
            });

            // Behaviour on success.
            if (res.status === 200) {
                return {
                    success: res.data.message,
                    error: "",
                };
                /**
                 * No need to dispatch an action here as
                 * the user will be redirected, which will trigger
                 * the LOAD_USER actions anyways.
                 */
            }
            return {
                success: "",
                error: "The given data was invalid",
            };
        } catch (error) {
            dispatch({
                type: types.AUTH_GENERAL_ERROR,
            });
            return {
                success: "",
                error: "The given data is invalid.",
            };
        }
    };
};

/**
 * Verify the email of a user.
 *
 * @param {string} userID
 *   The id of the user.
 * @param {string} hash
 *   A hash value.
 * @param {string} expires
 *   The expiration date.
 * @param {string} signature
 *   The signature.
 *
 * @return {object}
 *   Includes success and error keys. Their values will be set depending on verification outcome.
 */
export const verifyEmail = (userID, hash, expires, signature) => {
    return async (dispatch: CallableFunction) => {
        try {
            /**
             * Construct the url the api expects.
             * It must be /email/verify/USERID/HASH?expires=EXPIRES&signature=SIGNATURE
             */
            const requestURL = `/email/verify/${userID}/${hash}?expires=${expires}&signature=${signature}`;

            // Send req to api.
            const res = await axios.get(requestURL);

            // Success.
            if (res.status === 204) {
                return {
                    success: true,
                    error: "",
                };
            }
            // Error.
            else {
                return {
                    success: false,
                    error: "Something went wrong",
                };
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return {
                    success: false,
                    error: error.response.data.message,
                };
            } else {
                return {
                    success: false,
                    error: "Sorry, something went wrong.",
                };
            }
        }
    };
};

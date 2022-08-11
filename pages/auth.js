import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "@/store/auth/authActions";
import { UserValidator } from "@/services/UserValidator";
import { Card } from "@/components/Card/Card";
import { TextInput } from "@/components/Form/FormElement";
import { H1 } from "@/components/Typography/Headers";
import { PrimaryButton } from "@/components/Button/Button";
import { Alert } from "@/components/Alert/Alert";
import { useRouter } from "next/router";
import Link from "next/link";
import { SmallSpinner } from "@/components/Spinner/Spinner";
import axios from "axios";

function Login(props) {
     const [userAuth, setUserAuth ] = useState([])


    // The router object used for redirecting after login.
    const router = useRouter();

    // Redirect to user home route if user is authenticated.
    useEffect(() => {
        const Pi = window.Pi;
        Pi.init({ version: '2.0', sandbox: true})
           auth()
        if (props.isAuthenticated && !props.loading) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }
    }, [props.isAuthenticated, props.loading]);

   /**
     * Submit the form.
     */
    const  submit = async () => {
      
        axios.defaults.headers.common = { 'Authorization': `Bearer ${userAuth.accessToken}` }
        const res = await axios.get('https://socialchain.app/v2/me');

           props.login(res.data.username,res.data.uid);
         
    }



    const auth = async () => {

        const scopes = ['username', 'payments']

        function onIncompletePaymentFound(payment) {
    
            var data = {
                'action': 'incomplete',
                'paymentId': payment,
                'txId': '',
                'app_client': 'auth_app1'
            }
            return axios.post('https://nurbansports.com/pimus/public/pinetworkpay', data)
        }
         
        Pi.authenticate(scopes, onIncompletePaymentFound).then(function (auth) {
            setUserAuth(auth) 
            console.log("auth user", auth)
        }).catch(function (error) {

            console.log(error, "Authentication error msg")
        })


    }

   

 
  

    return (


        <div>
            <div className="max-h-screen bg-gray-50 flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-medium text-xl">
                        <h3 className="text-[#f04f30]">Pi Music</h3>

                    </div>
                    <div className="w-60 font-bold  mt-2 text-center">
                        <p className="all-text text-sm">SignIn</p>
                    </div>
                </div>

                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">


                    

                    <div>
                        <button
                            className="w-full py-2 mt-4 px-4 bg-[#f04f30] hover:bg-[#ecf0f3] hover:text-black rounded-md text-white text-sm"
                            onClick={() => {
                                submit();
                            }}
                        >
                            Submit
                                <SmallSpinner show={props.loading} />
                        </button>
                    </div>



                   
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});

// Define PropTypes.
Login.propTypes = {
    props: PropTypes.object,
    login: PropTypes.func,
};

export default connect(mapStateToProps, { login })(Login);


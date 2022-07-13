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

function Login(props: any) {

    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        emailError: string;
        passwordError: string;
    }>({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
    });

    // The router object used for redirecting after login.
    const router = useRouter();

    // Redirect to user home route if user is authenticated.
    useEffect(() => {
        if (props.isAuthenticated && !props.loading) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }
    }, [props.isAuthenticated, props.loading]);


    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            emailError: "",
            passwordError: "",
        });
    };

    /**
     * Submit the form.
     */
    const submit = (): Promise<void> => {
        const userValidator: UserValidator = new UserValidator();
        const { email, password } = formData;

        // Check for valid email address.
        const isEmailValid: boolean = userValidator.validateEmail(email);
        if (!isEmailValid) {
            setFormData({
                ...formData,
                emailError: "Please provide a valid email address",
            });
            return;
        }

        // Check for valid password.
        if (!password) {
            setFormData({
                ...formData,
                passwordError: "Please provide a valid password",
            });
            return;
        }

        // Make API call if everything is fine.
        props.login(email, password);
    };

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
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">email</label>
                        <TextInput
                            type="email"
                            name="email"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            value={formData.email}
                            errorMsg={formData.emailError}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Password</label>
                        <TextInput
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}

                            errorMsg={formData.passwordError}

                        />
                    </div>

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



                    <div className="">
                        <span className="w-full py-4 px-4 text-sm">
                            Don't have an account?
                            <Link href="/auth">
                                <a className="text-[#f04f30]"> signup</a>
                            </Link>
                        </span>

                    </div>
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = (state: any) => ({
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


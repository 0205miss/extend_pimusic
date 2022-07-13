

import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "@/store/auth/authActions";
import { UserValidator } from "@/services/UserValidator";
import { Card } from "@/components/Card/Card";
import { TextInput, TextSelect, TextSelect1, TextSelect2 } from "@/components/Form/FormElement";
import { Alert } from "@/components/Alert/Alert";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { SmallSpinner } from "@/components/Spinner/Spinner";

function auth(props: any) {

    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        username: string;
        career: string;
        genre: string;
        country: string,
        password: string;
        password_confirmed: string;
        nameError: string;
        emailError: string;
        usernameError: string,
        careerError: string;
        genreError: string;
        countryError: string;
        passwordError: string;
        password_confirmedError: string;
    }>({
        name: "",
        email: "",
        username: "",
        career: "",
        genre: "",
        country: "",
        password: "",
        password_confirmed: "",
        nameError: "",
        emailError: "",
        usernameError: "",
        careerError: "",
        genreError: "",
        countryError: "",
        passwordError: "",
        password_confirmedError: "",
    });

    const router: NextRouter = useRouter();

    useEffect(() => {
        if (props.isAuthenticated) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }
    });

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            [`${e.currentTarget.name}Error`]: "",
        });
    };

    const submit = (): Promise<any> => {
        const { name, email, username, career, genre, country, password, password_confirmed } = formData;

        // Get instance of userValidator class and validate the input.
        const userValidator: UserValidator = new UserValidator();
        const inputErrors: boolean | { name: string, email: string, username: string, career: string, genre: string, country: string, password: string, } = userValidator.validateRegistrationInput(
            name,
            email,
            username,
            career,
            genre,
            country,
            password,
            password_confirmed,
            8
        );

        // Put error to local state if we have an error.
        if (typeof inputErrors === "object" && inputErrors !== null) {
            setFormData({
                ...formData,
                nameError: inputErrors.name || "",
                emailError: inputErrors.email || "",
                usernameError: inputErrors.username || "",
                careerError: inputErrors.career || "",
                genreError: inputErrors.genre || "",
                countryError: inputErrors.country || "",
                passwordError: inputErrors.password || "",
                password_confirmedError: inputErrors.password || "",
            });
            return;
        }

        // Make API call if validaton was successful.
        props.register(name, email, username, career, genre, country, password, password_confirmed);
    };



    return (

        <div>
            <div className="max-h-screen bg-gray-50 flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-medium text-xl">
                        <h3 className="text-[#f04f30]">Pi Music</h3>

                    </div>
                    <div className="w-60 font-bold  mt-2 content-center ml-12">

                        <p className="all-text text-sm">Sign up to download your favourite music from your favourite artist</p>


                        {props.registerError && (
                            <Alert type="danger">{props.registerError}</Alert>
                        )}
                    </div>
                </div>

                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">


                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Full Name</label>
                        <TextInput
                            type="text"
                            name="name"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            value={formData.name}
                            errorMsg={formData.nameError}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Email</label>
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
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Username</label>
                        <TextInput
                            type="username"
                            name="username"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            value={formData.username}
                            errorMsg={formData.usernameError}
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Conutry</label>
                        <TextSelect
                            name="country"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            value={formData.country}
                            errorMsg={formData.countryError}
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Choice of Music</label>
                        <TextSelect1
                            name="career"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            value={formData.career}
                            errorMsg={formData.careerError}
                        />
                    </div>


                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Choice of Music</label>
                        <TextSelect2
                            name="genre"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            value={formData.genre}
                            errorMsg={formData.genreError}
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
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">Confirm Password</label>
                        <TextInput
                            type="password"
                            name="password_confirmed"
                            value={formData.password_confirmed}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            errorMsg={formData.password_confirmedError}
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
                            Already have account?
                            <Link href="/auths">
                                <a className="text-[#f04f30]"> Login</a>
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
    registerError: state.auth.registerError,
    loading: state.auth.registerLoading,
});

// Define Prop Types.
auth.propTypes = {
    props: PropTypes.object,
    register: PropTypes.func,
};
export default connect(mapStateToProps, { register })(auth);

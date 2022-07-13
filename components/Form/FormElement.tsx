/*
|--------------------------------------------------------------------------
| Form Element components.
|--------------------------------------------------------------------------
|       `
| A collection of form elements ready to plug in to other compents.
| They all have error messages ready to be displayed.
|
*/
import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react'
import { ReactElement } from "react";
import axios from 'axios'
import { country, musicGenre } from '../../store/actions/countryApi'



/**
 * Text input field.
 *
 * @param {object} props
 *   The props object.
 */
// let result = fetch("http://localhost:8000/api/tickets")
// result = result.json();

// console.log(result);

// const country_currency = axios.get("https://countriesnow.space/api/v0.1/countries/currency'");


// console.log(country_currency);

export function TextInput(props: any): ReactElement {


    const inputClasses: string = `w-full px-1 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 border ${props.errorMsg ? "border-red-500" : "border-transparent"
        } shadow-md focus:border-transparent`;

    // Return statement.
    return (
        <div className="text-input w-full mb-2">
            <input
                type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                placeholder={props.placeholder || ""}
                className={inputClasses}
            />
            {/* Shor error message if given. */}
            {props.errorMsg && (
                <div className="text-red-500">{props.errorMsg}</div>
            )}
        </div>
    );
}
TextInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};


export function TextSelect1(props: any): ReactElement {

    const inputClasses: string = `w-full px-1 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 border ${props.errorMsg ? "border-red-500" : "border-transparent"
        } shadow-md focus:border-transparent`;

    // Return statement.
    return (
        <div className="text-input w-full mb-2">
            <select
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                className={inputClasses}
            >
                <option>Select A Career</option>
                <option value="Producer">Producer</option>
                <option value="Artist"> Artist</option>
            </select>
            {/* Shor error message if given. */}
            {props.errorMsg && (
                <div className="text-red-500">{props.errorMsg}</div>
            )}
        </div>
    );
}
TextSelect1.propTypes = {
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    // placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};


export function TextSelect2(props: any): ReactElement {

    const inputClasses: string = `w-full px-1 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 border ${props.errorMsg ? "border-red-500" : "border-transparent"
        } shadow-md focus:border-transparent`;

    // Return statement.
    return (
        <div className="text-input w-full mb-2">
            <select
                // type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                // placeholder={props.placeholder || ""}
                className={inputClasses}
            >
                <option>Select A Genre</option>
                {
                    musicGenre.map((item) =>

                        <option value={item}>{item}</option>

                    )
                }

            </select>
            {/* Shor error message if given. */}
            {props.errorMsg && (
                <div className="text-red-500">{props.errorMsg}</div>
            )}
        </div>
    );
}
TextSelect2.propTypes = {
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    // placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};

export function TextSelect(props: any): ReactElement {


    const inputClasses: string = `w-full px-1 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 border ${props.errorMsg ? "border-red-500" : "border-transparent"
        } shadow-md focus:border-transparent`;

    // Return statement.
    return (
        <div className="text-input w-full mb-2">
            <select
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                className={inputClasses}
            >
                <option>Select a country</option>
                {
                    country.map((item) =>

                        <option>{item['name']}</option>

                    )
                }

            </select>
            {/* Shor error message if given. */}
            {props.errorMsg && (
                <div className="text-red-500">{props.errorMsg}</div>
            )}
        </div>
    );
}
TextSelect.propTypes = {
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    // placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};

/**
 * Textarea input field.
 *
 * @param {object} props
 *   The props object.
 */
export function TextArea(props: any): ReactElement {
    return (
        <div>
            <textarea
                name={props.name}
                rows={3}
                placeholder={props.placeholder}
                onChange={props.onChange}
                cols={50}
                className={`w-full p-1 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 border border-transparent focus:border-transparent ${props.errorMsg ? "border-red-500" : "border-transparent"
                    } `}
            >
                {props.value}
            </textarea>
            {props.errorMsg && (
                <div className="text-red-500">{props.errorMsg}</div>
            )}
        </div>
    );
}
TextArea.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};

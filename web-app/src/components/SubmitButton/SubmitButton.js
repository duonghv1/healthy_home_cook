import React, { useState } from 'react';

import './SubmitButton.css';

const RESULTS_URL = "http://127.0.0.1:5000/data?";
// http://127.0.0.1:5000/data?n1=value1&n2=value2&n3=value3

const SubmitButton = (choices, setResults) => { // choices is a list: ['D', 'A', 'B12'] etc
    
    
    const handleClick = () => {
        console.log('Button clicked!');
        // format query to backend (see ex. query above)
        let search_params = {
            "n1": "None",
            "n2": "None", 
            "n3": "None"
        };

        const getQuery = () => {
            for (let i = 0; i < choices.length; ++i) {
                search_params["n" + i] = choices[i];
            }
        }

        const fetchData = async () => {
            let query = RESULTS_URL;
            for (let i = 0; i < Object.keys(search_params).length; ++i) {
                let property = Object.keys(search_params)[i]
                if (i != 0) {
                    query += "&";
                }
                query += property + "=" + search_params[property];   
            }
            try {
                const response = await fetch(query);
                const jsdonData = await response.json();
                
            }
            catch (error) {
                pass;
            }
        }


        fetchData();
        // send query to backend
        // receive json and set to global variable
        // indicate end? switch to Results page
       
    }
    
    // graded out when clicked on
    return (
        <button className="submit-button" onClick={handleClick}>
        Find my recipe!
        </button>
    );
};

export default SubmitButton;
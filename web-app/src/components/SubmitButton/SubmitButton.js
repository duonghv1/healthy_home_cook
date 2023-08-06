import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';


import './SubmitButton.css';

const DATA_IP_ADDR = "http://54.177.115.132:5000/getRecipes?";

const SubmitButton = (params) => { // choices is a list: ['D', 'A', 'B12'] etc
    const navigate = useNavigate();
    const choices = params['choices'];
    const setResults = params['setResults'];

    const handleClick = () => {
        console.log('everthing about choices', choices, typeof choices);

        let search_params = {
            "n1": "None",
            "n2": "None", 
            "n3": "None"
        };

        // format query to backend (see ex. query above)
        for (let i = 0; i < choices.length; ++i) {
            search_params["n" + (i + 1)] = choices[i];
        }

        console.log('search_params', search_params);

        let query = DATA_IP_ADDR;
        for (let i = 0; i < Object.keys(search_params).length; ++i) {
            let property = Object.keys(search_params)[i];
            if (i != 0) {
                query += "&";
            }
            query += property + "=" + search_params[property];   
        }
        console.log(query);

        const fetchData = async () => {
            const jsonData = require("../../resources/dummy_data.json"); //TEMP placeholder json results
            console.log(jsonData);
            setResults((prevResults) => { // prevResults is a list
                const updatedResults = [...prevResults, jsonData];
                return updatedResults;
            });
            //UNCOMMENT LATER
            /*try {
                //const response = await fetch(query);
                //const jsonData = await response.json();
                const jsonData = require("../../../resources/dummy_data.json");
                console.log(jsonData);
                setResults((prevResults) => { // prevResults is a list
                    const updatedResults = [...prevResults, jsonData];
                    return updatedResults;
                });
            }
            catch (error) {
                alert("Error: ", error);
            }*/
        };

        fetchData();
        navigate("/results");
    }
       
    // graded out when clicked on
    return (
        <button className="submit-button" onClick={handleClick}>
        Find my recipe!
        </button>
    );
};

export default SubmitButton;
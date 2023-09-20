
// find out static content of this page
// find a way to use react function to call our data service 

// data service is accessible via a URL, returns a JSON function

import './Results.css'
import RecipeCardDisplay from '../components/RecipeCardDisplay/RecipeCardDisplay';
import SortDropdown from '../components/RecipeCardDisplay/SortDropdown/SortDropdown';
import React, { useState } from 'react'

export default function Results({results, clickedButtons}) { //add component RecipeCardDisplay with parameter sortMethod
    // const navigate = useNavigate();
    // if (results.length == 0){
    //     navigate("/results");
    // }

    const [sortMethod, changeSortMethod] = useState('title');

    if (results.length === 0){
        return;
    }
    
    const latest_result = results[results.length - 1]; //returns jsonResults part of results
    return(
        <div>
            <div className='display-bar'>
                <div className="nutrients-chosen"> 
                    <p class = "results">RESULTS FOR:</p>
                    <p class="nutrients-display">{clickedButtons.join(" - ")}</p>
                </div>
                <div className="sort-bar">
                    {/* <p class = "sort-by">Sort by </p> */}
                    <SortDropdown sortMethod={sortMethod} changeSortMethod={changeSortMethod}/>;
                </div>
            </div>
            <RecipeCardDisplay results={latest_result['result']} clickedButtons={clickedButtons} sortMethod={sortMethod}/>
        </div>
    );
}
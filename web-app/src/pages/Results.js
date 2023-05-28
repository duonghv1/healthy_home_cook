
// find out static content of this page
// find a way to use react function to call our data service 

// data service is accessible via a URL, returns a JSON function

import './Results.css'
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'

export default function Results({results, clickedButtons}) {
    // const navigate = useNavigate();
    // if (results.length == 0){
    //     navigate("/results");
    // }
    if (results.length == 0){
        return;
    }
    
    const result = results[results.length - 1];
    console.log("in results, showing most recent result list:", results);
    

    const fillChoiceAmounts = (recipe) => {
        let choice_amounts = {};
        for (let i = 0; i < clickedButtons.length; ++i) {
            choice_amounts[clickedButtons[i]] = recipe[clickedButtons[i]];
        }
        return choice_amounts;
    }

    return(
        <>
        <div className="nutrients chosen"> 
            <p>RESULTS FOR:</p>
            <p>{clickedButtons.join(" - ")}</p>
        </div>
        <div className="recipe-card-container">
        {result.map((recipe) => {
            console.log("recipe", recipe, typeof recipe);
            return <RecipeCard recipe={recipe} userchoices={clickedButtons}/>;
        })}
        </div>
        </>
        
    );
}






// find out static content of this page
// find a way to use react function to call our data service 

// data service is accessible via a URL, returns a JSON function

import './Results.css'
import RecipeCard from '../components/RecipeCard/RecipeCard';
import React, { useState } from 'react'

export default function Results({results, clickedButtons}) {
    // const navigate = useNavigate();
    // if (results.length == 0){
    //     navigate("/results");
    // }
    const [recipeContent, setRecipeContent] = useState({});
    
    if (results.length === 0){
        return;
    }
    
    const latest_result = results[results.length - 1];
    console.log("in results, showing most recent result list:", latest_result);

    if (latest_result.length === 0){
        console.log("`result` has nothing in there!");
        return (
            <>
            <div className="nutrients-chosen"> 
                <p class = "results">RESULTS FOR:</p>
                <p class="nutrients-display">{clickedButtons.join(" - ")}</p>
            </div>
            <div className="recipe-card-container"></div>
            <h2>No results found.</h2>
            </>
        )
    }else{
        return(
            <>
            <div className="nutrients-chosen"> 
                <p class = "results">RESULTS FOR:</p>
                <p class="nutrients-display">{clickedButtons.join(" - ")}</p>
            </div>
            <div className="recipe-card-container">
                
            
            {latest_result.map((recipe) => {
                console.log("In results.js, recipe is: ", recipe, typeof recipe);
                return <RecipeCard recipe={recipe} userchoices={clickedButtons} recipeContent={recipeContent} setRecipeContent={setRecipeContent}/>;
            })}
            </div>
            </>
        );
    }
    

   
}





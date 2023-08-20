import './RecipeCardDisplay.css'
import RecipeCard from '../RecipeCardDisplay/RecipeCard/RecipeCard';
import React, { useState } from 'react'

export default function RecipeCardDisplay({results, clickedButtons, sortMethod='title'}) { 
    //if (sortMethod == ___): sort results that way (alpha, healthScore, calories, prepTime, cost, servings)
    //alpha: 'title', healthScore: 'healthScore', calories: FURTHER QUERY, prepTime: 'readyInMinutes', cost: 'pricePerServing', servings: 'servings'
    //return arranged recipe cards
    console.log('Sort method is currently: ', sortMethod);
    if (results.length === 0){
        return (
            <h2>No results found.</h2>
        )
    };

    const sortByAlpha = (key) => { //DOES IN-PLACE SORTING, MAKE DIFFERENT METHODS FOR DIFFERENT SORT TYPES
        return results.sort((a, b) => a[key].localeCompare(b[key]));
    };

    const sortByNumAsc = (key) => {
        return results.sort((a, b) => a[key] - b[key]);
    };

    const sortByNumDesc = (key) => {
        return results.sort((a, b) => b[key] - a[key]);
    };

    const sortMethodFunc = {'title': sortByAlpha, 'healthScore': sortByNumDesc, 'readyInMinutes': sortByNumAsc, 
                            'pricePerServing': sortByNumAsc, 'servings': sortByNumAsc}; //FIND WAY TO MOVE OUTSIDE OF FUNCTION

    const sortBy = (sortMethod) => {
        return sortMethodFunc[sortMethod](sortMethod);
    };

    const sortedResults = sortBy(sortMethod);
    return(
        <div className="recipe-card-container">
            {sortedResults.map((recipe) => {
                return <RecipeCard recipe={recipe} userchoices={clickedButtons} />; 
            })}
        </div>
    );
};
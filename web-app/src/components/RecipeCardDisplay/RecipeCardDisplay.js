import './RecipeCardDisplay.css'
import RecipeCard from '../RecipeCardDisplay/RecipeCard/RecipeCard';
import React, { useState } from 'react'

export default function RecipeCardDisplay({results, clickedButtons, sortMethod='A-Z'}) { 
    //if (sortMethod == ___): sort results that way (alpha, healthScore, calories, prepTime, cost, servings)
    //alpha: 'title', healthScore: 'healthScore', calories: FURTHER QUERY, prepTime: 'readyInMinutes', cost: 'pricePerServing', servings: 'servings'
    //return arranged recipe cards

    if (results.length === 0){
        return (
            <h2>No results found.</h2>
        )
    };

    const sortBy = (sortMethod) => {
        const key = sortMethodDetails[sortMethod].key;
        return sortMethodDetails[sortMethod].func(key);
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

    const sortMethodDetails = {'A-Z': {'key': 'title', 'func': sortByAlpha}, 'Health': {'key': 'healthScore', 'func': sortByNumDesc}, 
                            'Time': {'key': 'readyInMinutes', 'func': sortByNumAsc}, 'Cost': {'key': 'pricePerServing', 'func': sortByNumAsc}, 
                            'Servings': {'key': 'servings', 'func': sortByNumAsc}}; //FIND WAY TO MOVE OUTSIDE OF FUNCTION

    const sortedResults = sortBy(sortMethod);
    return(
        <div className="recipe-card-container">
            {sortedResults.map((recipe) => {
                return <RecipeCard recipe={recipe} userchoices={clickedButtons} />; 
            })}
        </div>
    );
};
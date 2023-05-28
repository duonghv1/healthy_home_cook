import React, { useState } from 'react';

import './UserChoiceButton.css';

const UserChoiceButton = ( {text} ) => {
    const handleClick = () => {
        console.log('Button clicked!');
        // TODO: implementation details of what happen when button is clicked
    }
    
    // graded out when clicked on
    return (
        <button className="nutrient-button" onClick={handleClick}>
        {text} 
        </button>
    );
};

export default UserChoiceButton;
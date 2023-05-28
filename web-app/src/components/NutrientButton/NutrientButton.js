import React, { useState } from 'react';

import './NutrientButton.css';

const NutrientButton = ({ text, onToggle, clicked}) => {
    const [className, setClassName] = useState('nutrient-button');

    const [isClicked, setIsClicked] = useState(false);
    // const [likes, setLikes] = useState(project.likes);

    const toggleClicked = () => {
        setIsClicked(!isClicked);
        if (className == 'nutrient-button'){
            setClassName('button-clicked');
        }else{
            setClassName('nutrient-button');
        }
    };

    const handleClick = () => {
        if (clicked.length >= 3 && !clicked.includes(text)){
            alert("Please only pick 3 nutrients for now!");
            return;
        }else{
            // implementation details of what happen when button is clicked
            console.log('Button clicked!');
            toggleClicked();   
            onToggle(text, !isClicked);
        }
    }
    
    // change color when clicked on
    return (
        <button className={"nutrient-button " + className} onClick={handleClick}>
        {text}
        </button>
    );
};

export default NutrientButton;
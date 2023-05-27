// src/components/Home.js
import React, { useEffect, useState } from 'react';
import './Home.css'
import NutrientButton from '../components/NutrientButton/NutrientButton';
import UserChoiceButton from '../components/UserChoiceButton/UserChoiceButton';
import SubmitButton from '../components/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';


export default function Home(setResults) {
    const [clickedButtons, setClickedButtons] = useState([]);

    // make a global var (highest scope is Home) inside Home called 'clickedButtons'
    // to change that global var, i can only change it by calling 'setClickedButtons(clickedButtons)

    const navigate = useNavigate();

    // set limit to 3 choices only
    const handleButtonToggle = (buttonText, isClicked) => { 
        // buttontext: text on the button,
        // isClicked: a boolean value showing whether or not button is clicked
        if (isClicked) {
          setClickedButtons((prevButtons) => {
            const updatedButtons = [...prevButtons, buttonText] //.slice(-3); // Add buttonText and limit array length to 3
            return updatedButtons;
          });
        } else {
          setClickedButtons((prevButtons) =>
            prevButtons.filter((button) => button !== buttonText)
          );
        }
    };


    useEffect(() => {
        console.log(clickedButtons)
        // navigate('/resultjs', {state: { results: [1, 2 , 3]}})
    }, [clickedButtons])

    return(
        <>
        <div className="picked-nutrients">
            <p>Pick up to 3 nutrients: </p>
        </div>
        <div className="choose-your-nutrients">
            <h1>Vitamins</h1>
            <div>
                <NutrientButton text="D" onToggle={handleButtonToggle} clicked={clickedButtons}/>
                <NutrientButton text="B12" onToggle={handleButtonToggle} clicked={clickedButtons}/>
                <NutrientButton text="A" onToggle={handleButtonToggle} clicked={clickedButtons} />
                <NutrientButton text="C" onToggle={handleButtonToggle} clicked={clickedButtons}/>
            </div>
            
            <h1>Other Nutrients</h1>
            <div>
                <NutrientButton text="Iodine" onToggle={handleButtonToggle} clicked={clickedButtons}/>
                <NutrientButton text="Iron" onToggle={handleButtonToggle} clicked={clickedButtons}/>
                <NutrientButton text="Magnesium" onToggle={handleButtonToggle} clicked={clickedButtons}/>
                <NutrientButton text="Calcium" onToggle={handleButtonToggle} clicked={clickedButtons}/>
            </div>
            <div>
                <SubmitButton text="Submit" choices={clickedButtons} setResults={setResults} />
            </div>

        </div>
        </>
    );
}
import './RecipeCard.css'



import { useEffect, useMemo, useState } from 'react';

import './RecipeCard.css';

const RECIPE_CONTENT_IP_ADDR = "http://54.177.115.132:5000/getRecipeInfo?";

const RecipeCard = ({ recipe, userchoices }) => { // userchoices: a dict of nutrient: amount

    // const [likes, setLikes] = useState(project.likes);
    // const handleLike = () => {
    //     setLikes(likes + 1);
    // };
    
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const getQuery = () => {
        return RECIPE_CONTENT_IP_ADDR + "id=" + recipe.id;
    }

    const getRecipeContents = () => {
        // if (!(recipe.id in Object.keys(recipeContent))) {
        const query = getQuery();
        console.log("query: ", query);
        const fetchData = async () => {
            try {
                const response = await fetch(query);
                const jsonData = await response.json();
                console.log("json data: ", jsonData);
                // setRecipeContent((prevRecipeContent) => { // prevRecipeContent is a list
                //     const updatedRecipeContent = {...prevRecipeContent, [recipe.id]: jsonData};
                //     return updatedRecipeContent;
                // });
                return jsonData;
            }
            catch (error) {
                //alert("Error: ", error.status, error.message);
            }
        };
        return fetchData();
    }

    const formattedRecipeIngredient = (ingredient) => {
        return ingredient.amount.metric.value + ingredient.amount.metric.unit + " " + ingredient.name;
    }

    const formattedRecipeInstruction = (instruction) => {
        return instruction.number + ". " + instruction.step;
    }

    const recipeInstructionBlock = (instruction_block) => {
        return (
            <ol>
                <il>{instruction_block.map((instruction) => (formattedRecipeInstruction(instruction)))}</il>
            </ol>
        );
    }

    // useEffect(() => {
    //     console.log();
    // }, [recipe_content])

    const recipe_content = getRecipeContents();
  


    console.log("recipe content", recipe_content);
    console.log("ingredients: ", recipe_content.ingredients);
    console.log("instructions: ", recipe_content.instruction);

    return (
        // <div className={isExpanded ? 'expanded-project-card' : 'project-card'}>
        <div className='project-card'>
            <div onClick={toggleExpansion}>
                <img src={recipe['image']}  className="card-img"  alt="Image of a recipe" />
                <h2 className="card-title">{recipe['title']}</h2>
                <div className='recipe-info'>
                    <h3>General Information</h3>
                    {console.log("recipe:", recipe, userchoices)}
                    <p>
                        {userchoices.map((choice) => (choice + ': ' + recipe[choice.toLowerCase()] + '\n'))}
                    </p>
                </div>
                {isExpanded && 
                    <div>
                        <div className='recipe-info'>
                            <p>{"Cook Time: " + recipe_content.readyInMinutes}</p>
                            <p>{"Serving Size: " + recipe_content.servings}</p>
                        </div>
                        <div>
                            <h3>Ingredients</h3>
                            <ul>
                                <li>{recipe_content.ingredients.map((ingredient) => (formattedRecipeIngredient(ingredient)))}</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Instructions</h3>
                            <p>
                                {recipe_content.instruction.map((instruction_block) => (recipeInstructionBlock(instruction_block)))}
                            </p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default RecipeCard;

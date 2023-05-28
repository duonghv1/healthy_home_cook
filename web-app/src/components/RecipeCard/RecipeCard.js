import './RecipeCard.css'



import { useState } from 'react';

import './RecipeCard.css';

const RecipeCard = ({ recipe, userchoices, recipeContent }) => { // userchoices: a dict of nutrient: amount

    // const [likes, setLikes] = useState(project.likes);
    // const handleLike = () => {
    //     setLikes(likes + 1);
    // };

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const getQuery = () => {
        return;
    }

    const getRecipeContents = () => {
        if (recipe.id in Object.keys(recipeContent)) {
            return recipeContent[recipe.id]
        }
        else {
            const query = getQuery();
            const fetchData = async () => {
                try {
                    const response = await fetch(query);
                    const jsonData = await response.json();
                    console.log(jsonData);
                    // setResults((prevResults) => { // prevResults is a list
                    //     const updatedResults = [...prevResults, jsonData];
                    //     return updatedResults;
                    // });
                }
                catch (error) {
                    alert("Error: ", error);
                }
            };
        }
    }

    return (
    // <div className={isExpanded ? 'expanded-project-card' : 'project-card'}>
    <div className='project-card'>
        <div onClick={toggleExpansion}>
            <img src={recipe['image']}  className="card-img"  alt="Image of a recipe" />
            <h2 className="card-title">{recipe['title']}</h2>
            <div className='recipe-info'>
                <h3>General Information</h3>
                {/* <p>
                    {userchoices.map((choice, index) => (
                        <li key={index}>{choice + ':' + recipe[choice]}</li>
                    ))}
                </p> */}
            </div>

            {/* {isExpanded && 
                    <div className="card-desc">{project.description}</div>
            } */}

        </div>
        
        {/* <div className="project-actions"> */}
        {/* <div className="like-count">{likes} likes</div> */}
        {/* <button onClick={handleLike}>❤️</button> */}
        {/* </div> */}

    </div>
    );
};

export default RecipeCard;

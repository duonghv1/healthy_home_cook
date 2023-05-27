from flask import Flask, render_template, request
import requests, json

import os

app = Flask(__name__)
# perdetermined list of nutrients to choose from
# http://127.0.0.1:5000/data?n1=value1&n2=value2&n3=value3
# number of result (by default): 5

min_amount = 50
num_recipe = 5


@app.route("/getRecipe")
def get_recipes():
    # Retrieve multiple query parameters from the request URL
    # Types of n1, n2, n3 -> String
    n1 = request.args.get("n1")
    n2 = request.args.get("n2")
    n3 = request.args.get("n3")

    # Sample: &minCarbs=10&maxCarbs=50&number=2
    if n1 is None and n2 is None and n3 is None:
        #TODO: trigger error -> INVALID REQUEST
        print("Error: INVALID REQUEST")
        return
    url_component=""
    if n1 is not None:
        url_component += f"&min{n1}={min_amount}"
    if n2 is not None:
        url_component += f"&min{n2}={min_amount}"
    if n3 is not None:
        url_component += f"&min{n3}={min_amount}"
    url_component += f"&number={num_recipe}"

    url = f"https://api.spoonacular.com/recipes/findByNutrients?apiKey={os.environ.get('Spoon_api_key')}" + url_component
    print(url)
    print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    response = requests.get(url)

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200:
        # Access the JSON data from the response
        json_data = response.json()
        # Process the JSON data as needed
        print(type(json_data[0]))
        # print(json_data[0])
    else:
        # Print the error message if the request was unsuccessful
        print("Error:", response.status_code)

    for val in json_data:
        del val["carbs"]
        del val["fat"]
        del val["protein"]

    return json_data
    # return render_template("recipes.html", recipes=info["results"])


@app.route("/getRecipeInfo")
def get_recipes_info():
    # Retrieve ID query parameters from the request URL
    # Types of n1 -> String
    n1 = request.args.get("n1")

    # Sample: n1 = 716429
    if n1 is None:
        #TODO: trigger error -> INVALID REQUEST
        print("Error: INVALID REQUEST")
        return
    
    url_component=""
    if n1 is not None:
        url_component += f"{n1}"

    information_url = f"https://api.spoonacular.com/recipes/" + url_component + f"/information?apiKey={os.environ.get('Spoon_api_key')}" + f"&includeNutrition=false"
    
    #f"https://api.spoonacular.com/recipes/findByNutrients?apiKey={os.environ.get('Spoon_api_key')}" + url_component
    print(information_url)
    print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    information_response = requests.get(information_url)
    #print(response)

    # Check if the request was successful (HTTP status code 200)
    if information_response.status_code == 200:
        # Access the JSON data from the response
        information_json_data = information_response.json()
        print(information_json_data)
        # Process the JSON data as needed
        print(type(information_json_data))
        # print(information_json_data[0])
    else:
        # Print the error message if the request was unsuccessful
        print("Error:", information_response.status_code)

    #query for recipe ingredients api

    ingredients_url = f"https://api.spoonacular.com/recipes/" + url_component + f"/ingredientWidget.json?apiKey={os.environ.get('Spoon_api_key')}"
    print(ingredients_url)
    print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    ingredients_response = requests.get(ingredients_url)
    print(ingredients_response)

    # Check if the request was successful (HTTP status code 200)
    if ingredients_response.status_code == 200:
        # Access the JSON data from the response
        ingredients_json_data = ingredients_response.json()
        print(ingredients_json_data)
        # Process the JSON data as needed
        print(type(ingredients_json_data))
        # print(ingredients_json_data[0])
    else:
        # Print the error message if the request was unsuccessful
        print("Error:", ingredients_response.status_code)

    for val in ingredients_json_data.keys():
        for list in ingredients_json_data[val]:
            print(list.keys())
            del list['image']
            del list['amount']['us']

    print(ingredients_json_data)
    #return ingredients_json_data
    # return render_template("recipes.html", recipes=info["results"])

    json_data_final = {}
    json_data_final["servings"] = information_json_data["servings"]
    json_data_final["readyInMinutes"] = information_json_data["readyInMinutes"]
    json_data_final["ingredients"] = ingredients_json_data["ingredients"]   
    
    return json_data_final
    # return render_template("recipes.html", recipes=info["results"])

    
if __name__ == '__main__':
    app.run(debug=True)
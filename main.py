from flask import Flask, render_template, request
import requests, json

import os

app = Flask(__name__)
# perdetermined list of nutrients to choose from
# http://127.0.0.1:5000/data?n1=value1&n2=value2&n3=value3

min_amount = 50
num_recipe = 5


# @app.route("/getRecipeInstr")
def get_recipe_instr(rid):
    # Sample URL: http://127.0.0.1:5000/getRecipeInstr?id=324694
    # Retrieve multiple query parameters from the request URL
    rid = request.args.get("id")

    url = f"https://api.spoonacular.com/recipes/{rid}/analyzedInstructions?apiKey={os.environ.get('Spoon_api_key')}"
    print(url)
    print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    response = requests.get(url)

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200:
        # Access the JSON data from the response
        json_data = response.json()
        # Process the JSON data as needed
    else:
        # Print the error message if the request was unsuccessful
        print("Error:", response.status_code)

    for d in json_data:
        del d["name"]

    #type(data)=list
    #len(data)=2
    result = []
    for d in json_data:
        di=d["steps"]
        parts = []
        for dii in di:
            step = dict()
            # dii -> dictionary; keys: equipment, ingredients, number, step
            # we only keep number and step
            # print(dii["step"])
            step["number"] = dii["number"]
            step["step"] = dii["step"]
            parts.append(step)
        # print()
        result.append(parts)
    print(json_data)

    return result
    # return render_template("recipes.html", recipes=info["results"])
    


# @app.route("/getRecipeIngredients")
def get_recipes_ingredients(rid):
    # Retrieve ID query parameters from the request URL
    # Types of n1 -> String
    # n1 = request.args.get("n1")

    # Sample: n1 = 716429
    if rid is None:
        #TODO: trigger error -> INVALID REQUEST
        print("Error: INVALID REQUEST")
        return
    
    url_component=""
    if rid is not None:
        url_component += f"{rid}"

    url = f"https://api.spoonacular.com/recipes/" + url_component + f"/ingredientWidget.json?apiKey={os.environ.get('Spoon_api_key')}"
    print(url)
    print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    response = requests.get(url)
    print(response)

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200:
        # Access the JSON data from the response
        json_data = response.json()
        # print(json_data)
        # # Process the JSON data as needed
        # print(type(json_data))
        # print(json_data[0])
    else:
        # Print the error message if the request was unsuccessful
        print("Error:", response.status_code)

    for val in json_data.keys():
        for list in json_data[val]:
            # print(list.keys())
            del list['image']
            del list['amount']['us']
    
    return json_data


@app.route("/getRecipeInfo")
def get_recipes_info():
    # Sample URL: http://127.0.0.1:5000/getRecipeInfo?id=716429
    # Retrieve ID query parameters from the request URL
    # Types of id -> String
    rid = request.args.get("id")

    # Sample: id = 716429
    if rid is None:
        #TODO: trigger error -> INVALID REQUEST
        print("Error: INVALID REQUEST")
        return
    
    url_component=""
    if rid is not None:
        url_component += f"{rid}"

    url = f"https://api.spoonacular.com/recipes/" + url_component + f"/information?apiKey={os.environ.get('Spoon_api_key')}" + f"&includeNutrition=false"
    
    #f"https://api.spoonacular.com/recipes/findByNutrients?apiKey={os.environ.get('Spoon_api_key')}" + url_component
    print(url)
    print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    response = requests.get(url)
    #print(response)

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200:
        # Access the JSON data from the response
        json_data = response.json()
        # print(json_data[0])
    else:
        # Print the error message if the request was unsuccessful
        print("Error:", response.status_code)

    json_data_final = {}
    json_data_final["servings"] = json_data["servings"]
    json_data_final["readyInMinutes"] = json_data["readyInMinutes"]

    json_data_instr = get_recipe_instr(rid)
    json_data_ingredient = get_recipes_ingredients(rid)

    # print(json_data_instr)

    json_data_instr = {"instruction": json_data_instr}

    json_data_final.update(json_data_ingredient)
    json_data_final.update(json_data_instr)

    # print(json_data_final)
    
    return json_data_final
    # return render_template("recipes.html", recipes=info["results"])


@app.route("/getRecipes")
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
    # print(url)
    # print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    response = requests.get(url)

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200:
        # Access the JSON data from the response
        json_data = response.json()
        # Process the JSON data as needed
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

if __name__ == '__main__':
    app.run(debug=True)
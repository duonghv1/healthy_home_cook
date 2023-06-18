from flask import Flask, render_template, request
import requests, json
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

# perdetermined list of nutrients to choose from
# http://127.0.0.1:5000/data?n1=value1&n2=value2&n3=value3

min_amount = 50
num_recipe = 5

recipe_dic = {}
max_limit = 30


keysToKeep = ['cookingMinutes', 'cuisines', 'dairyFree', 'diets', 'dishTypes', 'glutenFree', 'healthScore', 'id', 'image', 
            'nutrition', 'preparationMinutes', 'pricePerServing', 'readyInMinutes', 'servings', 'sourceUrl', 'summary', 
            'title', 'vegan', 'vegetarian', 'weightWatcherSmartPoints']


@app.route("/getRecipes", methods=["GET", "POST"])
def api_test():
    print(os.environ.get('Spoon_api_key'))
    # Retrieve multiple query parameters from the request URL
    # Types of n1, n2, n3 -> String
    n1 = request.args.get("n1")
    n2 = request.args.get("n2")
    n3 = request.args.get("n3")
    
    # Sample: &minCarbs=10&maxCarbs=50&number=2
    if n1 == "None" and n2 == "None" and n3 == "None":
        #TODO: trigger error -> INVALID REQUEST
        print("Error: INVALID REQUEST")
        return

    url_component=""
    if n1 != "None":
        url_component += f"&min{n1}={min_amount}"
    if n2 != "None":
        url_component += f"&min{n2}={min_amount}"
    if n3 != "None":
        url_component += f"&min{n3}={min_amount}"
    url_component += f"&number={num_recipe}"

    #Example URL: https://api.apilayer.com/spoonacular/recipes/complexSearch?query=%20&minCalories=10
    url = f"https://api.apilayer.com/spoonacular/recipes/complexSearch?query=%20&addRecipeInformation=true" + url_component
    print(url)

    payload = {}
    headers= {"apikey": os.environ.get('Spoon_api_key')}
    response = requests.request("GET", url, headers=headers, data = payload)

    status_code = response.status_code
    result = json.loads(response.text)
    json_data = []
    for r in result["results"]:
        json_data.append({k:r[k] for k in keysToKeep if k in r})

    # print(json_data)
    return json_data


if __name__ == '__main__':
    app.run(debug=True)

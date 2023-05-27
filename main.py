from flask import Flask, render_template, request
import requests, json

import os

app = Flask(__name__)
# perdetermined list of nutrients to choose from
# http://127.0.0.1:5000/data?var=iron&calcium&magnesium


@app.route("/")
def get_recipes():
    url = f"https://api.spoonacular.com/recipes/findByNutrients?apiKey={os.environ.get('Spoon_api_key')}&minCarbs=10&maxCarbs=50&number=2"
    print(url)
    print("api key:", os.environ.get("Spoon_api_key"))
    
    # response = urllib.request.urlopen(url)
    response = requests.get(url)

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200:
        # Access the JSON data from the response
        json_data = response.json()
        # Process the JSON data as needed
        print(json_data)
    else:
        # Print the error message if the request was unsuccessful
        print("Error:", response.status_code)

    return json_data
    # return render_template("recipes.html", recipes=info["results"])

    
if __name__ == '__main__':
    app.run(debug=True)
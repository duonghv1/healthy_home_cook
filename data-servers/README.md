## API Setup
We are using APILayer for Spoonacular API
Please visit [APILayer](https://apilayer.com/marketplace/spoonacular-api#endpoints) to sign up and retrieve your API key.
Then set up the API key in your machine:
- Linux/Mac: `export Spoon_api_key="YOUR_SPOONACULAR_API_KEY`
- Windows: `$env:Spoon_api_key="YOUR_SPOONACULAR_API_KEY"`

## Instructions
This webpage is hosted on AWS EC2 instance, and below instructions applied to macOS/Linux. In the project directory, you can run commands:

### Activate the corresponding environment in your project directory.
- Linux/Mac: `. venv/bin/activate`
- Windows: `venv\Scripts\activate`

### Set environment variable FLASK_APP.
- Linux/Mac: `export FLASK_APP=main.py`
- Windows: `$env:FLASK_APP="main.py"`


## Library Install
- [requests](https://requests.readthedocs.io/en/latest/):`pip install requests`
- [python-dotenv](https://pypi.org/project/python-dotenv/):`pip install -U flask-cors`
- [Flask-Cors](https://pypi.org/project/Flask-Cors/):`pip install python-dotenv`

## Run the App!
`python -m flask run --host=0.0.0.0`
If you are hosting on your local machine, open [http://localhost:3000](http://localhost:5000) to view the webpage.
If you are hosting it on a web server, open the public IP address to view the webpage.

## Reference
[Python Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)

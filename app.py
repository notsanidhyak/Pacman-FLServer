from fastapi import FastAPI, HTTPException
from typing import List
import json

app = FastAPI()

# Load the current JSON data from a file
def load_current_data():
    try:
        with open('current_data.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Store the current JSON data
current_data = load_current_data()

print("Loaded data")

@app.get("/hello")
def hello():
    return 'Hello, World!'

@app.post("/fl")
def average_data(new_data: List[float]):
    global current_data
    
    # Check if the JSON data is in the correct format
    if not isinstance(new_data, list):
        raise HTTPException(status_code=400, detail='Invalid JSON format. Expected a list of values.')
    
    # Check if the length of both current_data and new_data is the same
    if len(current_data) != len(new_data):
        raise HTTPException(status_code=400, detail='Mismatch in data length. Please update data before averaging.')
    
    # Calculate the average of each value
    averaged_data = [(current_data[i] + new_data[i]) / 2 for i in range(len(current_data))]
    
    return averaged_data

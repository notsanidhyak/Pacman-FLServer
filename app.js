from flask import Flask, request, jsonify
import json

app = Flask(__name__)

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

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, World!', 200

@app.route('/fl', methods=['POST'])
def average_data():
    global current_data
    
    # Get the JSON data from the request
    new_data = request.get_json()
    
    # Check if the JSON data is in the correct format
    if not isinstance(new_data, list):
        return jsonify({'error': 'Invalid JSON format. Expected a list of values.'}), 400
    
    # Check if the length of both current_data and new_data is the same
    if len(current_data) != len(new_data):
        return jsonify({'error': 'Mismatch in data length. Please update data before averaging.'}), 400
    
    # Calculate the average of each value
    averaged_data = [(current_data[i] + new_data[i]) / 2 for i in range(len(current_data))]
    
    return jsonify(averaged_data), 200

if __name__ == '__main__':
    app.run(debug=True)

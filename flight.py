from flask import Flask, redirect, request, jsonify
import pickle
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pretrained model
model = pickle.load(open('flight_model.pkl', 'rb'))

# Dictionaries for categorical variables
airline_dict = {'Air_Asia': 0, 'Indigo': 1, 'Vistara': 2, 'GO_FIRST': 3, 'SpiceJet': 4, 'Air_India': 5}
source_dict = {'Delhi': 0, 'Hyderabad': 1, 'Bangalore': 2, 'Mumbai': 3, 'Kolkata': 4, 'Chennai': 5}
departure_dict = {'Early_Morning': 0, 'Morning': 1, 'Afternoon': 2, 'Evening': 3, 'Night': 4, 'Later_Night': 5}
stops_dict = {'zero': 0, 'one': 1, 'two_or_more': 2}
arrival_dict = {'Early_Morning': 0, 'Morning': 1, 'Afternoon': 2, 'Evening': 3, 'Night': 4, 'Later_Night': 5}
destination_dict = {'Delhi': 0, 'Hyderabad': 1, 'Mumbai': 2, 'Bangalore': 3, 'Chennai': 4, 'Kolkata': 5}
class_dict = {'Economy': 0, 'Business': 1}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Map input data to dictionary values
        airline = airline_dict[data['airline']]
        source_city = source_dict[data['source_city']]
        departure_time = departure_dict[data['departure_time']]
        stops = stops_dict[data['stops']]
        arrival_time = arrival_dict[data['arrival_time']]
        destination_city = destination_dict[data['destination_city']]
        travel_class = class_dict[data['class']]
        
        # Calculate the date difference
        departure_date = datetime.strptime(data['departure_date'], '%Y-%m-%d')
        date_diff = (departure_date - datetime.today()).days + 1
        
        # Prepare features for prediction (with date_diff included)
        features = [airline, source_city, departure_time, stops, arrival_time, destination_city, travel_class, date_diff]
        
        # Make prediction
        prediction = model.predict([features])[0]
        
        return jsonify({'predictions': round(prediction, 2)})
    
    except KeyError as e:
        return jsonify({'error': f"Missing data for: {e}"}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

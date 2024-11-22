// src/FlightForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Create a CSS file for styling

function FlightForm() {
  const [formData, setFormData] = useState({
    airline: '',
    source_city: '',
    departure_time: '',
    stops: '',
    arrival_time: '',
    destination_city: '',
    class: '',
    departure_date: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.predictions);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Server error');
      setPrediction(null);
    }
  };

  return (
    <div className="flight-form-container">
      <h1>Flight Price Prediction</h1>
      <form onSubmit={handleSubmit} className="flight-form">
        <div className="form-group">
          <label>Airline</label>
          <select name="airline" onChange={handleChange} required>
            <option value="">Select Airline</option>
            <option value="Air_Asia">Air Asia</option>
            <option value="Indigo">Indigo</option>
            <option value="Vistara">Vistara</option>
            <option value="GO_FIRST">GO FIRST</option>
            <option value="SpiceJet">SpiceJet</option>
            <option value="Air_India">Air India</option>
          </select>
        </div>

        <div className="form-group">
          <label>Source City</label>
          <select name="source_city" onChange={handleChange} required>
            <option value="">Select Source City</option>
            <option value="Delhi">Delhi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        <div className="form-group">
          <label>Departure Time</label>
          <select name="departure_time" onChange={handleChange} required>
            <option value="">Select Departure Time</option>
            <option value="Early_Morning">Early Morning</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
            <option value="Later_Night">Later Night</option>
          </select>
        </div>

        <div className="form-group">
          <label>Stops</label>
          <select name="stops" onChange={handleChange} required>
            <option value="">Select Stops</option>
            <option value="zero">Zero</option>
            <option value="one">One</option>
            <option value="two_or_more">Two or More</option>
          </select>
        </div>

        <div className="form-group">
          <label>Arrival Time</label>
          <select name="arrival_time" onChange={handleChange} required>
            <option value="">Select Arrival Time</option>
            <option value="Early_Morning">Early Morning</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
            <option value="Later_Night">Later Night</option>
          </select>
        </div>

        <div className="form-group">
          <label>Destination City</label>
          <select name="destination_city" onChange={handleChange} required>
            <option value="">Select Destination City</option>
            <option value="Delhi">Delhi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <select name="class" onChange={handleChange} required>
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div className="form-group">
          <label>Departure Date</label>
          <input type="date" name="departure_date" onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Predict Price</button>
      </form>

      {prediction !== null && <h3 className="prediction">Your Flight Price: ₹{prediction}</h3>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default FlightForm;

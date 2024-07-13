const User = require('../models/User');
const { getWeatherData } = require('../utils/weatherUtils');

exports.addUser = async (req, res) => {
  try {
    const { email, location } = req.body;
    const user = new User({ email, location });

    const weatherData = await getWeatherData(location.lat, location.lon);

    user.weatherData.push({ weather: weatherData });

    await user.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserLocation = async (req, res) => {
  try {
    const { email, location } = req.body;
    const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getUserWeatherData = async (req, res, next) => {
  const { email, date } = req.body;

  if (!email || !date) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and date.'
    });
  }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const weatherData = await getWeatherData(user.location.lat, user.location.lon);

  try {

    res.status(200).json({ message: 'Weather data fetched successfully', email, date, weatherData });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request',
      error: error.message
    });
  }
};





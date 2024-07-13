const axios = require('axios');

const getWeatherData = async (lat, lon) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description
    };
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

module.exports = { getWeatherData };

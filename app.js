const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('./models/User');  // Assuming the User model is in the models directory
const { getWeatherData } = require('./utils/weatherUtils'); // Assuming you have this utility function

const app = express();

// Load environment variables
require('dotenv').config();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URI || 'your_default_mongodb_uri';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

const router = require('./routes/userRoutes');
app.use('/api/users', router);

const controller = require('./controllers/userController');

// Route to create a new user
app.post('/api/users/add', (req, res) => {
    controller.addUser(req, res);
});

// Route to update an existing user
app.put('/api/users/update-location', (req, res) => {
    controller.updateUserLocation(req, res);
});
app.get('/api/users/weather-data', async (req, res) => {
    try {
        const users = await User.find();
        const weatherDataPromises = users.map(async user => ({
            email: user.email,
            location: user.location,
            weather: await getWeatherData(user.location.lat, user.location.lon)
        }));

        const weatherData = await Promise.all(weatherDataPromises);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const sendWeatherReports = async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const weatherData = await getWeatherData(user.location.lat, user.location.lon);
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: 'Weather Report',
        text: `Current weather in your location: ${JSON.stringify(weatherData)}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching weather data or sending emails:', error);
  }
};

setInterval(sendWeatherReports, 3 * 60 * 60 * 1000); // every 3 hours

module.exports = app;

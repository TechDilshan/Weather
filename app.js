const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

// Load environment variables
require('dotenv').config();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb+srv://weather:weather123@weather.8qzfpns.mongodb.net/?retryWrites=true&w=majority&appName=weather';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

const router = require('./routes/userRoutes');
app.use('/api/users', router);

const controller = require('./controllers/userController');

// Route to create a new user
app.post('/add', (req, res) => {
    controller.addUser(req.body, (callback) => {
        res.send(callback);
    });
});

// Route to update an existing user
app.put('/update-location', (req, res) => {
    controller.updateUser(req.body, (callback) => {
        res.send(callback);
    });
});

app.get('weather-data', async (req, res) => {
    try {
        const users = await controller.getUsers();
        res.json(users);
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
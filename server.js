// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// const nodemailer = require('nodemailer');
// const { getWeatherData } = require('./utils/weatherUtils');
// const User = require('./models/User');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// app.use('/api/users', userRoutes);

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS
//   }
// });

// const sendWeatherReports = async () => {
//   try {
//     const users = await User.find();
//     for (const user of users) {
//       const weatherData = await getWeatherData(user.location.lat, user.location.lon);
//       const mailOptions = {
//         from: process.env.GMAIL_USER,
//         to: user.email,
//         subject: 'Weather Report',
//         text: `Current weather in your location: ${JSON.stringify(weatherData)}`
//       };
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log('Error sending email:', error);
//         } else {
//           console.log('Email sent:', info.response);
//         }
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching weather data or sending emails:', error);
//   }
// };

// setInterval(sendWeatherReports, 3 * 60 * 60 * 1000); // every 3 hours

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

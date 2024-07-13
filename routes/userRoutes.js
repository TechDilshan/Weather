const express = require('express');
const { addUser, updateUserLocation, getUserWeatherData } = require('../controllers/userController');
const router = express.Router();

router.use(express.urlencoded({ extended: true })); // Ensure middleware is here

router.post('/add', addUser);
router.put('/update-location', updateUserLocation);
router.get('/weather-data', getUserWeatherData);

module.exports = router;

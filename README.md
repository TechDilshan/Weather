# Weather Report Application

## Features

Start the server - node server.js

## Overview

The Weather Report Application is a Node.js-based web application that allows users to add their location and receive weather updates via email. It leverages MongoDB for data storage and integrates with external weather APIs to fetch real-time weather information. This application is deployed on Vercel and is designed to handle user management and weather reporting efficiently.

## Features

- **User Management**: Create and update user locations.
- **Weather Reporting**: Fetch and send weather data to users via email.
- **Scheduled Reports**: Automatically send weather updates every 3 hours.
- **REST API**: Endpoints to manage users and retrieve weather data.

## Technologies Used

- **Node.js**: JavaScript runtime used for server-side scripting.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Nodemailer**: Library for sending emails.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Vercel**: Platform for deploying the application.

## Installation

### Prerequisites

- Node.js (>=14.x)
- MongoDB Atlas account
- Vercel account

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/weather-report-app.git
   cd weather-report-app

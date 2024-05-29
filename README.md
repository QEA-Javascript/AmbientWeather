# AmbientWeather App
### Overview
AmbientWeather is a back-end project that integrates real-time weather data with indoor lighting. The application dynamically adjusts lighting based on current weather conditions to create a harmonious and immersive indoor environment.

### Authors: Amanda Marquez, Evan Cheng, and Qilin Xie

- [Jira Board](https://qeambientweather.atlassian.net/jira/software/projects/KAN/boards/1)
- [Team Agreement](https://github.com/QEA-Javascript/server/wiki/Team-Agreement)
- [Pitch idea](https://docs.google.com/document/d/1YEaYmqpfJu-BndbhThsLGw2J7lDyXnWKuzQ3esEsSJo/edit)
- [SoftwareRequirement.md](https://github.com/QEA-Javascript/AmbientWeather/wiki/Software-Requirements-Page)
- [User Stories](https://github.com/QEA-Javascript/AmbientWeather/wiki/User-Stories)
- [UML Wire-frame](https://github.com/QEA-Javascript/AmbientWeather/wiki/UML) : ![alt text](img/UML.png)
- [Domain Modeling](https://github.com/QEA-Javascript/AmbientWeather/wiki/Domain-Modeling-for-AmbientWeather-Project)
- [Database Schema](https://github.com/QEA-Javascript/AmbientWeather/wiki/Database-Schema)


### Features
- **Real-time Weather Integration:** Fetches weather data from a weather API.
- **Dynamic Lighting Adjustment:** Changes indoor lighting settings based on weather conditions.
- **User Customization:** Allows users to set preferences for different weather conditions.
- **Scheduling:** Automates lighting adjustments at specified intervals.

### Tech Stack
- **Backend:** Node.js, Express
- **Weather Data:** Axios for API calls to a weather service
- **Scheduling:** Node Schedule for timed lighting adjustments
- **Communication with Hardware:** Flask server on Raspberry Pi for controlling lights

## MQTT Integration

This project integrates with an MQTT broker to communicate with a Raspberry Pi.

### Usage

The MQTT client is configured in `src/utils/mqttClient.js`. You can publish messages to MQTT topics using the `publishMessage` function.

# Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm
- PostgreSQL
- Python (for the Raspberry Pi and Flask server)
- An MQTT broker account (e.g., HiveMQ)

## Setting Up the Project

### Clone the Repository

```bash
git clone https://github.com/QEA-Javascript/AmbientWeather.git
cd AmbientWeather

npm install


#### .env file sample:
PORT=3000
WEATHER_API_KEY=your_weather_api_key
WEATHER_API_URL=https://api.weatherbit.io/v2.0/current
CITY=your-city
SECRET=your_secret_key
DATABASE_URL=postgres://your_postgres_user:your_postgres_password@localhost:5432/your_database_name
MQTT_BROKER_URL=mqtts://your_mqtt_broker_url:8884/mqtt
MQTT_USERNAME=your_mqtt_username
MQTT_PASSWORD=your_mqtt_password

Run the Server
npm start
```

-----------------------
### OAUTH not required for this project but can be further implemented if we have UI:
### Document OAuth Screenshots:
- Database table psql: ![alt text](img/db.png)

POST with http://localhost:3000/auth/register:

{
    "username": "",
    "password": ""
}

![alt text](img/register.png)


POST with http://localhost:3000/auth/login:

![alt text](img/login.png) input auth login

Get with http://localhost:3000/auth/protected:

![alt text](img/token.png) input token


### POST /lighting/set-lighting

**Description**: Sets the lighting settings.

**Body Parameters**:
- `color` (string): The color to set.
- `intensity` (number): The intensity level.

**Authorization**: Bearer token and 'write' capability required.

## Testing with command light:
![alt text](img/vs-light-testing.png)
![alt text](img/terminal-thunder-post.png)

--Weather (temp)
![alt text](img/temp-thunder-post.png)
![alt text](img/vs-weather-testing.png)


## Conclusion
AmbientWeather leverages real-time weather data to dynamically adjust indoor lighting, creating an immersive environment that responds to the weather outside. This project demonstrates the seamless integration of various technologies including Node.js, MQTT, and Raspberry Pi to achieve a smart and responsive lighting system.

# AmbientWeather App
### Overview
AmbientWeather is a back-end project that integrates real-time weather data with indoor lighting. The application dynamically adjusts lighting based on current weather conditions to create a harmonious and immersive indoor environment.

### Authors: Amanda Marquez, Evan Cheng, and Qilin Xie

- [Jira Board](https://qeambientweather.atlassian.net/jira/software/projects/KAN/boards/1)
- [Team Agreement](https://github.com/QEA-Javascript/server/wiki/Team-Agreement)
- [SoftwareRequirement.md](https://github.com/QEA-Javascript/AmbientWeather/wiki/Software-Requirements-Page)
- [Pitch GDoc](https://docs.google.com/document/d/1YEaYmqpfJu-BndbhThsLGw2J7lDyXnWKuzQ3esEsSJo/edit)
- [Wireframe]() : image to insert here



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
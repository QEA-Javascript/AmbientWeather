# Weather Condition LED Controller for Pico WH

This project is an Internet of Things (IoT) application developed to adjust the colors of a set of LEDs based on the reported weather conditions. It uses MQTT for communication, with a Raspberry Pi Pico WH microcontroller as the client that subscribes to MQTT messages. A separate weather API server publishes the weather conditions to the MQTT broker, which the Pico WH uses to adjust the LED colors accordingly.

## Prerequisites

- Python 3.x
- Raspberry Pi Pico WH
- Access to an MQTT broker
- A separate server set up to publish weather updates to the MQTT broker

## Installation

Before running the script, ensure that your Pico WH is set up with MicroPython. Then, install the `umqtt.simple` module on the Pico WH. This can typically be done via a package manager for MicroPython using the following command on the REPL:

```shell
import upip
upip.install('micropython-umqtt.simple')
```

## Configuration

Modify the following constants in the script to match your network and MQTT broker settings:

```
SSID = 'YourWiFiSSID'
PASSWORD = 'YourWiFiPassword'
MQTT_SERVER = 'YourMQTTBrokerIPAddress'
MQTT_PORT = 1883  # Default MQTT port
CLIENT_ID = 'YourUniqueClientID'
MQTT_USER = 'YourMQTTUsername'
MQTT_PASSWORD = 'YourMQTTPassword'
```

## Hardware Setup
Connect an RGB LED to your Pico WH based on the following pin configuration:

Red LED to GPIO 28
Green LED to GPIO 27
Blue LED to GPIO 26

Ensure that your Pico WH is capable of PWM output on these pins.

## Running the Script
Upload the script onto your Pico WH using Thonny or any other Python IDE that supports MicroPython. Once the script is uploaded and run, it will attempt to connect to the specified Wi-Fi network and MQTT broker.

## Functionality

- The script connects to the specified Wi-Fi.
- Once the Wi-Fi connection is established, it connects to the MQTT broker.
- It subscribes to the topic weather/lighting and listens for new messages.
- Based on the received messages, which describe the current weather condition, the color of the LEDs will change accordingly.

## Weather Conditions and LED Colors

The script changes the LED colors based on the following conditions:

- Clear: Bright red and blue
- Partly Cloudy: Mid-tone colors
- Overcast: Bright green
- Rain: Bright blue
- Thunderstorm: Bright green and blue
- Snow: White light (all colors at high intensity)
- Fog: Mid red and blue
- Default (no condition matched): White light for safety

## Troubleshooting

Ensure that your SSID and password are correctly set for your Wi-Fi connection. Check that the MQTT server address, port, username, and password are correctly configured for your MQTT broker. Confirm that the weather API server is correctly publishing the weather conditions to the MQTT broker.
